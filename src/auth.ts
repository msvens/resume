import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const ADMIN_GITHUB_ID = process.env.ADMIN_GITHUB_ID;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ profile }) {
      if (!ADMIN_GITHUB_ID) return false;
      return profile?.id?.toString() === ADMIN_GITHUB_ID;
    },
    async jwt({ token, profile }) {
      if (profile?.id) token.githubId = profile.id.toString();
      return token;
    },
    async session({ session, token }) {
      if (token.githubId) {
        session.user.githubId = token.githubId as string;
      }
      return session;
    },
  },
  pages: { signIn: '/admin/signin' },
});
