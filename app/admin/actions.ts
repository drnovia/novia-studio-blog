"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { isValidSlug, parseTags } from "@/lib/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveDraftState = { error: string } | null;

type ArticleStatus = "draft" | "published" | "archived";

function readField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function invalidateArticleCache(...slugs: Array<string | null | undefined>) {
  updateTag("articles");
  for (const slug of new Set(slugs.filter(Boolean) as string[])) {
    updateTag(`article:${slug}`);
  }
}

export async function saveDraft(_prev: SaveDraftState, formData: FormData): Promise<SaveDraftState> {
  const { supabase } = await requireAdmin();

  const id = readField(formData, "id");
  const title = readField(formData, "title");
  const slug = readField(formData, "slug");
  const excerpt = readField(formData, "excerpt");
  const category = readField(formData, "category");
  const body = String(formData.get("body") ?? "");
  const tags = parseTags(String(formData.get("tags") ?? ""));

  if (!title) return { error: "Judul wajib diisi." };
  if (title.length > 200) return { error: "Judul maksimal 200 karakter." };
  if (!slug) return { error: "Slug wajib diisi." };
  if (!isValidSlug(slug)) {
    return { error: "Slug hanya boleh huruf kecil, angka, dan tanda hubung (contoh: soft-morning)." };
  }

  const payload = {
    title,
    slug,
    excerpt,
    category: category || null,
    body,
    tags,
  };

  if (id) {
    const { data: existing, error: existingError } = await supabase
      .from("articles")
      .select("slug, status")
      .eq("id", id)
      .maybeSingle();
    if (existingError) return { error: "Gagal menyimpan. Coba lagi." };
    if (!existing) return { error: "Artikel tidak ditemukan." };

    const { data, error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", id)
      .select("id, slug, status")
      .maybeSingle();

    if (error) {
      if (error.code === "23505") return { error: "Slug sudah dipakai artikel lain." };
      return { error: "Gagal menyimpan. Coba lagi." };
    }
    if (!data) return { error: "Artikel tidak ditemukan." };

    if (existing.status === "published" || data.status === "published") {
      invalidateArticleCache(existing.slug, data.slug);
    }

    redirect(`/admin/edit/${data.id}?saved=1`);
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({ ...payload, status: "draft" })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") return { error: "Slug sudah dipakai artikel lain." };
    return { error: "Gagal membuat draft. Coba lagi." };
  }

  redirect(`/admin/edit/${data.id}?saved=1`);
}

export async function setArticleStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = readField(formData, "id");
  const intent = readField(formData, "intent");
  if (!id) redirect("/admin");

  const nextStatus: ArticleStatus | null =
    intent === "publish" ? "published" : intent === "draft" ? "draft" : intent === "archive" ? "archived" : null;
  if (!nextStatus) redirect(`/admin/edit/${id}`);

  const { data: existing, error: existingError } = await supabase
    .from("articles")
    .select("slug, status")
    .eq("id", id)
    .maybeSingle();
  if (existingError || !existing) redirect("/admin");

  const update: { status: ArticleStatus; published_at?: string } = { status: nextStatus };
  if (nextStatus === "published") {
    update.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase.from("articles").update(update).eq("id", id).select("id, slug").maybeSingle();
  if (error || !data) redirect(`/admin/edit/${id}?error=status`);

  invalidateArticleCache(existing.slug, data.slug);
  redirect(`/admin/edit/${data.id}?saved=1`);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
