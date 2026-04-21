import 'server-only';
import { db } from '@/db/client';
import { section, sectionItem } from '@/db/schema';
import { asc, eq, and } from 'drizzle-orm';

export async function listSections() {
  return db.select().from(section).orderBy(asc(section.sortOrder));
}

export async function getSection(id: number) {
  const rows = await db.select().from(section).where(eq(section.id, id));
  return rows[0] ?? null;
}

export async function listItemsBySection(sectionId: number) {
  return db.select().from(sectionItem).where(eq(sectionItem.sectionId, sectionId)).orderBy(asc(sectionItem.sortOrder));
}

export async function getSectionItem(id: number) {
  const rows = await db.select().from(sectionItem).where(eq(sectionItem.id, id));
  return rows[0] ?? null;
}

export async function listSectionsWithItems() {
  const sections = await listSections();
  return Promise.all(
    sections.map(async (s) => ({
      ...s,
      items: await listItemsBySection(s.id),
    }))
  );
}

export async function listPdfSectionsWithItems() {
  const sections = await db.select().from(section)
    .where(and(eq(section.showInPdf, true)))
    .orderBy(asc(section.sortOrder));
  return Promise.all(
    sections.map(async (s) => ({
      ...s,
      items: await listItemsBySection(s.id),
    }))
  );
}
