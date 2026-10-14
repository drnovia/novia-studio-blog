import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "./actions";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="mt-8 text-ink/60">Memuat…</p>}>
      <AdminHome />
    </Suspense>
  );
}

async function AdminHome() {
  const { supabase, email } = await requireAdmin();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, status, updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw error;

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-5xl text-ocean-900">Dashboard</h1>
        <form action={signOut} className="flex items-center gap-3 text-sm text-ink/70">
          <span>{email}</span>
          <button
            type="submit"
            className="rounded-full border border-ocean-900/20 px-4 py-2 text-ink transition hover:bg-ivory-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
          >
            Keluar
          </button>
        </form>
      </div>

      <div className="mt-6">
        <Link
          href="/admin/new"
          className="inline-flex rounded-full bg-ocean-900 px-5 py-2.5 text-sm font-medium text-ivory-50 transition hover:bg-ocean-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
        >
          Tulis artikel
        </Link>
      </div>

      <section aria-label="Semua artikel" className="mt-8 rounded-3xl bg-ivory-100 p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-ocean-900">Artikel ({articles.length})</h2>
        {articles.length === 0 ? (
          <p className="mt-4 text-ink/70">Belum ada artikel.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ocean-900/10">
            {articles.map((article) => (
              <li key={article.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <Link
                    href={`/admin/edit/${article.id}`}
                    className="block truncate font-medium text-ink underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
                  >
                    {article.title}
                  </Link>
                  <p className="truncate text-xs text-ink/55">{article.slug}</p>
                </div>
                <span className="shrink-0 rounded-full bg-ocean-50 px-3 py-1 text-xs font-medium text-ocean-700">
                  {article.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
