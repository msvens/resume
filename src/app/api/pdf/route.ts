import { renderToBuffer } from '@react-pdf/renderer';
import { getProfile } from '@/lib/services/profile';
import { listPdfSectionsWithItems } from '@/lib/services/sections';
import { ResumePdf } from '@/lib/pdf/ResumePdf';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') === 'sv' ? 'sv' as const : 'en' as const;

  const [profile, sections] = await Promise.all([
    getProfile(),
    listPdfSectionsWithItems(),
  ]);

  if (!profile) {
    return new Response('Profile not found', { status: 404 });
  }

  const buffer = await renderToBuffer(
    ResumePdf({ profile, sections, locale: lang })
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="martin-svensson-resume-${lang}.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
