"use client";

import { useActionState, useState } from "react";
import { saveDraft, type SaveDraftState } from "./actions";
import { slugify } from "@/lib/slug";

export type ArticleFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string;
  body: string;
  status?: string;
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-ocean-900/15 bg-ivory-50 px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500";

const labelClass = "block text-sm font-medium text-ink";

type Props = {
  initial: ArticleFormValues;
  saved?: boolean;
};

export function ArticleForm({ initial, saved = false }: Props) {
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id || initial.slug));
  const [state, formAction, pending] = useActionState<SaveDraftState, FormData>(saveDraft, null);

  return (
    <form action={formAction} className="mt-8 grid gap-5 rounded-3xl bg-ivory-100 p-6 sm:p-8">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      {initial.status ? (
        <p className="text-sm text-ink/60">
          Status: <span className="font-medium text-ocean-700">{initial.status}</span>
          {saved && !state?.error ? <span className="ml-3 text-ocean-700">· Tersimpan</span> : null}
        </p>
      ) : saved && !state?.error ? (
        <p className="text-sm text-ocean-700">Tersimpan</p>
      ) : null}

      <label className={labelClass}>
        Judul
        <input
          name="title"
          required
          maxLength={200}
          value={title}
          onChange={(e) => {
            const next = e.target.value;
            setTitle(next);
            if (!slugTouched) setSlug(slugify(next));
          }}
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Slug
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value.trim().toLowerCase());
          }}
          className={`${fieldClass} font-mono text-sm`}
          placeholder="soft-morning"
        />
        <span className="mt-1 block text-xs text-ink/55">URL publik: /journal/{slug || "…"}</span>
      </label>

      <label className={labelClass}>
        Excerpt
        <textarea name="excerpt" rows={2} defaultValue={initial.excerpt} className={fieldClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Kategori
          <input name="category" defaultValue={initial.category} className={fieldClass} placeholder="Journal" />
        </label>
        <label className={labelClass}>
          Tags
          <input
            name="tags"
            defaultValue={initial.tags}
            className={fieldClass}
            placeholder="coastal, soft, morning"
          />
          <span className="mt-1 block text-xs text-ink/55">Pisahkan dengan koma</span>
        </label>
      </div>

      <label className={labelClass}>
        Isi (Markdown)
        <textarea
          name="body"
          rows={16}
          defaultValue={initial.body}
          className={`${fieldClass} font-mono text-sm leading-6`}
          placeholder={"## Heading\n\nTulis di sini…"}
        />
      </label>

      {state?.error ? (
        <p role="alert" className="text-sm text-[#b4473b]">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ocean-900 px-6 py-3 font-medium text-ivory-50 transition hover:bg-ocean-700 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
        >
          {pending ? "Menyimpan…" : initial.id ? "Simpan" : "Simpan draft"}
        </button>
      </div>
    </form>
  );
}
