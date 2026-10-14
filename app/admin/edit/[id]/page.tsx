import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { ArticleForm } from "../../ArticleForm";
import { StatusActions } from "../../StatusActions";

export const metadata: Metadata = { title: "Edit artikel" };

// Cache Components needs at least one param; placeholder resolves to 404.
export function generateStaticParams() {
  return [{ id: "__placeholder__" }];
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default function EditArticlePage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="mt-8 text-ink/60">Memuat…</p>}>
      <EditArticle params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function EditArticle({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { saved } = await searchParams;
  if (!id || id === "__placeholder__") notFound();

  const { supabase } = await requireAdmin();
  const { data: article, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, category, tags, body, status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!article) notFound();

  return (
    <>
      <div className="mt-4">
        <Link href="/admin" className="text-sm text-ocean-700 underline-offset-2 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-2 font-serif text-5xl text-ocean-900">Edit artikel</h1>
        <p className="mt-2 text-ink/70">{article.title}</p>
        <StatusActions id={article.id} status={article.status} slug={article.slug} />
      </div>

      <ArticleForm
        saved={saved === "1"}
        initial={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.category ?? "",
          tags: article.tags.join(", "),
          body: article.body,
          status: article.status,
        }}
      />
    </>
  );
}
