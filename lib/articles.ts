import { cacheTag } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  published_at: string;
};

export type Article = ArticleSummary & {
  body: string;
  tags: string[];
};

const summaryColumns = "slug, title, excerpt, category, published_at";

export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  "use cache";
  cacheTag("articles");

  const { data, error } = await supabasePublic
    .from("articles")
    .select(summaryColumns)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheTag("articles", `article:${slug}`);

  const { data, error } = await supabasePublic
    .from("articles")
    .select(`${summaryColumns}, body, tags`)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from("articles")
    .select("slug")
    .eq("status", "published");

  if (error) throw error;
  return data.map((row) => row.slug);
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function formatArticleDate(iso: string) {
  return dateFormat.format(new Date(iso));
}
