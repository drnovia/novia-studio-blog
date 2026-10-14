import type { Metadata } from "next";
import Link from "next/link";
import { CoastalBackdrop } from "@/components/CoastalBackdrop";
import { formatArticleDate, getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, feelings, and everything in between.",
};

export default async function JournalPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="relative min-h-svh overflow-x-clip">
      <CoastalBackdrop />

      <header className="flex flex-col items-center px-5 pt-20 text-center sm:pt-28">
        <p className="font-serif text-sm tracking-[0.35em] text-ocean-900 uppercase sm:text-lg">
          Novia Studio
        </p>
        <span aria-hidden="true" className="my-4 h-px w-8 bg-coral-400 sm:my-5" />
        <h1 className="font-serif text-6xl leading-none text-ocean-900 sm:text-8xl">Journal</h1>
        <p className="mt-5 max-w-xl text-base text-balance text-ink/80 sm:text-xl">
          Stories, feelings, and everything in between.
        </p>
      </header>

      <section aria-label="Daftar tulisan" className="mx-auto mt-12 max-w-3xl px-5 pb-32 sm:mt-16 sm:pb-40">
        {articles.length === 0 ? (
          <p className="rounded-3xl bg-ivory-50 p-8 text-center font-serif text-2xl text-ocean-900 shadow-[0_12px_40px_rgb(19_50_74/0.14)]">
            No entries yet — the first one is on its way.
          </p>
        ) : (
          <ul className="grid gap-6">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="rounded-3xl bg-ivory-50 p-6 shadow-[0_12px_40px_rgb(19_50_74/0.14)] sm:p-8">
                  <p className="text-xs font-semibold tracking-[0.3em] text-coral-400 uppercase">
                    <time dateTime={article.published_at}>{formatArticleDate(article.published_at)}</time>
                    {article.category ? ` · ${article.category}` : null}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-ocean-900 sm:text-4xl">
                    <Link
                      href={`/journal/${article.slug}`}
                      className="rounded-sm hover:text-ocean-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-500"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  {article.excerpt ? (
                    <p className="mt-3 text-base leading-7 text-ink/85">{article.excerpt}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
