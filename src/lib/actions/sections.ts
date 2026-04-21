'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './auth-guard';
import { sectionSchema, sectionItemSchema } from '@/lib/validation/schemas';
import { db } from '@/db/client';
import { section, sectionItem } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

function emptyToNull(val: string | undefined): string | null {
  return val && val.trim() !== '' ? val.trim() : null;
}

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/admin/sections');
}

// --- Sections ---

export async function createSection(formData: FormData) {
  await requireAdmin();

  const raw = {
    slug: formData.get('slug') as string,
    labelEn: formData.get('labelEn') as string,
    labelSv: formData.get('labelSv') as string,
    displayType: formData.get('displayType') as string,
    visible: formData.get('visible') === 'on',
    showInPdf: formData.get('showInPdf') === 'on',
    sortOrder: Number(formData.get('sortOrder')),
  };

  const parsed = sectionSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.format() };
  }

  await db.insert(section).values(parsed.data);
  revalidateAll();
  return { ok: true };
}

export async function updateSection(id: number, formData: FormData) {
  await requireAdmin();

  const raw = {
    slug: formData.get('slug') as string,
    labelEn: formData.get('labelEn') as string,
    labelSv: formData.get('labelSv') as string,
    displayType: formData.get('displayType') as string,
    visible: formData.get('visible') === 'on',
    showInPdf: formData.get('showInPdf') === 'on',
    sortOrder: Number(formData.get('sortOrder')),
  };

  const parsed = sectionSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.format() };
  }

  await db.update(section).set(parsed.data).where(eq(section.id, id));
  revalidateAll();
  return { ok: true };
}

export async function deleteSection(id: number) {
  await requireAdmin();
  await db.delete(section).where(eq(section.id, id));
  revalidateAll();
  return { ok: true };
}

export async function reorderSections(id: number, direction: 'up' | 'down') {
  await requireAdmin();
  const all = await db.select().from(section).orderBy(asc(section.sortOrder));
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return { ok: false };

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return { ok: false };

  const current = all[idx];
  const swap = all[swapIdx];
  await db.update(section).set({ sortOrder: swap.sortOrder }).where(eq(section.id, current.id));
  await db.update(section).set({ sortOrder: current.sortOrder }).where(eq(section.id, swap.id));

  revalidateAll();
  return { ok: true };
}

// --- Section Items ---

export async function createSectionItem(formData: FormData) {
  await requireAdmin();

  const raw = {
    sectionId: Number(formData.get('sectionId')),
    titleEn: formData.get('titleEn') as string,
    titleSv: formData.get('titleSv') as string,
    subtitleEn: formData.get('subtitleEn') as string,
    subtitleSv: formData.get('subtitleSv') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    link: formData.get('link') as string,
    descriptionEn: formData.get('descriptionEn') as string,
    descriptionSv: formData.get('descriptionSv') as string,
    sortOrder: Number(formData.get('sortOrder')),
  };

  const parsed = sectionItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.format() };
  }

  const data = parsed.data;
  await db.insert(sectionItem).values({
    sectionId: data.sectionId,
    titleEn: data.titleEn,
    titleSv: data.titleSv,
    subtitleEn: emptyToNull(data.subtitleEn),
    subtitleSv: emptyToNull(data.subtitleSv),
    startDate: emptyToNull(data.startDate),
    endDate: emptyToNull(data.endDate),
    link: emptyToNull(data.link),
    descriptionEn: emptyToNull(data.descriptionEn),
    descriptionSv: emptyToNull(data.descriptionSv),
    sortOrder: data.sortOrder,
  });

  revalidateAll();
  revalidatePath(`/admin/sections/${data.sectionId}`);
  return { ok: true };
}

export async function updateSectionItem(id: number, formData: FormData) {
  await requireAdmin();

  const raw = {
    sectionId: Number(formData.get('sectionId')),
    titleEn: formData.get('titleEn') as string,
    titleSv: formData.get('titleSv') as string,
    subtitleEn: formData.get('subtitleEn') as string,
    subtitleSv: formData.get('subtitleSv') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    link: formData.get('link') as string,
    descriptionEn: formData.get('descriptionEn') as string,
    descriptionSv: formData.get('descriptionSv') as string,
    sortOrder: Number(formData.get('sortOrder')),
  };

  const parsed = sectionItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.format() };
  }

  const data = parsed.data;
  await db.update(sectionItem).set({
    titleEn: data.titleEn,
    titleSv: data.titleSv,
    subtitleEn: emptyToNull(data.subtitleEn),
    subtitleSv: emptyToNull(data.subtitleSv),
    startDate: emptyToNull(data.startDate),
    endDate: emptyToNull(data.endDate),
    link: emptyToNull(data.link),
    descriptionEn: emptyToNull(data.descriptionEn),
    descriptionSv: emptyToNull(data.descriptionSv),
    sortOrder: data.sortOrder,
  }).where(eq(sectionItem.id, id));

  revalidateAll();
  revalidatePath(`/admin/sections/${data.sectionId}`);
  return { ok: true };
}

export async function deleteSectionItem(id: number) {
  await requireAdmin();
  await db.delete(sectionItem).where(eq(sectionItem.id, id));
  revalidateAll();
  return { ok: true };
}

export async function reorderSectionItem(id: number, sectionId: number, direction: 'up' | 'down') {
  await requireAdmin();
  const all = await db.select().from(sectionItem).where(eq(sectionItem.sectionId, sectionId)).orderBy(asc(sectionItem.sortOrder));
  const idx = all.findIndex((item) => item.id === id);
  if (idx === -1) return { ok: false };

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return { ok: false };

  const current = all[idx];
  const swap = all[swapIdx];
  await db.update(sectionItem).set({ sortOrder: swap.sortOrder }).where(eq(sectionItem.id, current.id));
  await db.update(sectionItem).set({ sortOrder: current.sortOrder }).where(eq(sectionItem.id, swap.id));

  revalidateAll();
  revalidatePath(`/admin/sections/${sectionId}`);
  return { ok: true };
}
