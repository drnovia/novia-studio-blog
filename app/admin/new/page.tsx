import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { ArticleForm } from "../ArticleForm";

export const metadata: Metadata = { title: "Tulis artikel" };

export default function NewArticlePage() {
  return (
    <Suspense fallback={<p className="mt-8 text-ink/60">Memuat…</p>}>
      <NewArticle />
    </Suspense>
  );
}

async function NewArticle() {
  await requireAdmin();

  return (
    <>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="text-sm text-ocean-700 underline-offset-2 hover:underline">
            ← Dashboard
          </Link>
          <h1 className="mt-2 font-serif text-5xl text-ocean-900">Artikel baru</h1>
          <p className="mt-2 text-ink/70">Disimpan sebagai draft. Publish menyusul di fase berikutnya.</p>
        </div>
      </div>

      <ArticleForm
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          category: "",
          tags: "",
          body: "",
          status: "draft",
        }}
      />
    </>
  );
}
