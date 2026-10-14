import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { CoastalBackdrop } from "@/components/CoastalBackdrop";
import { formatArticleDate, getPublishedArticle, getPublishedSlugs } from "@/lib/articles";

// Cache Components requires at least one param; the placeholder resolves to 404.
export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

const bodyStyles =
  "text-lg leading-8 text-ink/85 [&_a]:text-ocean-700 [&_a]:underline [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-coral-400 [&_blockquote]:pl-5 [&_blockquote]:font-serif [&_blockquote]:text-2xl [&_blockquote]:text-ocean-900 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ocean-900 [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-ocean-900 [&_li]:mt-2 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&>*:first-child]:mt-0";

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  return (
    <main className="relative min-h-svh overflow-x-clip">
      <CoastalBackdrop />

      <article className="mx-auto max-w-2xl px-5 pt-20 pb-32 sm:pt-28 sm:pb-40">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 rounded-full bg-ivory-50/85 px-4 py-2 text-sm text-ink shadow-sm backdrop-blur-sm transition hover:bg-ivory-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
        >
          <span aria-hidden="true">&larr;</span> Journal
        </Link>

        <header className="mt-8 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-coral-400 uppercase">
            <time dateTime={article.published_at}>{formatArticleDate(article.published_at)}</time>
            {article.category ? ` · ${article.category}` : null}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-balance text-ocean-900 sm:text-6xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-4 text-lg text-balance text-ink/80 sm:text-xl">{article.excerpt}</p>
          ) : null}
        </header>

        {article.body || article.tags.length > 0 ? (
          <div className="mt-10 rounded-3xl bg-ivory-50 p-6 shadow-[0_12px_40px_rgb(19_50_74/0.14)] sm:p-10">
            <div className={bodyStyles}>
              <Markdown>{article.body}</Markdown>
            </div>
            {article.tags.length > 0 ? (
              <ul aria-label="Tags" className="mt-10 flex flex-wrap gap-2 border-t border-ocean-900/10 pt-6">
                {article.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-ocean-50 px-3 py-1 text-sm text-ocean-700">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </article>
    </main>
  );
}
