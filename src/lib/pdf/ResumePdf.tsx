import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { formatDateRange } from '@/lib/dates';
import type { ProfileData, SectionWithItems } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: '40 50',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
    lineHeight: 1.4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    color: '#555',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    fontSize: 9,
    color: '#555',
  },
  contactItem: {
    marginHorizontal: 6,
  },
  sectionContainer: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  bio: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 16,
    color: '#333',
  },
  entryContainer: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  entryDate: {
    fontSize: 9,
    color: '#555',
  },
  entrySubtitle: {
    fontSize: 9,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  entryDescription: {
    fontSize: 9,
    color: '#333',
    lineHeight: 1.5,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  chip: {
    fontSize: 9,
    color: '#333',
    backgroundColor: '#f3f3f3',
    padding: '3 8',
    borderRadius: 2,
  },
  link: {
    color: '#1a1a1a',
    textDecoration: 'none',
  },
});

interface ResumePdfProps {
  profile: ProfileData;
  sections: SectionWithItems[];
  locale: 'en' | 'sv';
}

function pick<T>(en: T, sv: T, locale: 'en' | 'sv'): T {
  return locale === 'sv' ? sv : en;
}

export function ResumePdf({ profile, sections, locale }: ResumePdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{pick(profile.titleEn, profile.titleSv, locale)}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{profile.email}</Text>
            <Text style={styles.contactItem}>{pick(profile.locationEn, profile.locationSv, locale)}</Text>
            {profile.github && (
              <Link src={`https://github.com/${profile.github}`} style={[styles.contactItem, styles.link]}>
                GitHub
              </Link>
            )}
            {profile.linkedin && (
              <Link src={profile.linkedin} style={[styles.contactItem, styles.link]}>
                LinkedIn
              </Link>
            )}
            {profile.phone && <Text style={styles.contactItem}>{profile.phone}</Text>}
          </View>
        </View>

        {/* Bio */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {locale === 'sv' ? 'Profil' : 'Profile'}
          </Text>
          {pick(profile.bioEn, profile.bioSv, locale).split('\n\n').map((para, i) => (
            <Text key={i} style={styles.bio}>{para}</Text>
          ))}
        </View>

        {/* Sections */}
        {sections.map((s) => (
          <View key={s.id} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{pick(s.labelEn, s.labelSv, locale)}</Text>

            {s.displayType === 'chips' ? (
              <View style={styles.chipsContainer}>
                {s.items.map((item) => (
                  <Text key={item.id} style={styles.chip}>
                    {pick(item.titleEn, item.titleSv, locale)}
                  </Text>
                ))}
              </View>
            ) : (
              s.items.map((item) => {
                const dateStr = formatDateRange(item.startDate, item.endDate, locale);
                const title = pick(item.titleEn, item.titleSv, locale);
                const subtitle = pick(item.subtitleEn, item.subtitleSv, locale);
                const description = pick(item.descriptionEn, item.descriptionSv, locale);

                return (
                  <View key={item.id} style={styles.entryContainer}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>
                        {item.link ? (
                          <Link src={item.link} style={styles.link}>{title}</Link>
                        ) : (
                          title
                        )}
                        {subtitle ? ` — ${subtitle}` : ''}
                      </Text>
                      {dateStr && <Text style={styles.entryDate}>{dateStr}</Text>}
                    </View>
                    {description && <Text style={styles.entryDescription}>{description}</Text>}
                  </View>
                );
              })
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
