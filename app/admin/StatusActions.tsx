import Link from "next/link";
import { setArticleStatus } from "./actions";

type Props = {
  id: string;
  status: string;
  slug: string;
};

const buttonClass =
  "rounded-full border border-ocean-900/20 px-4 py-2 text-sm text-ink transition hover:bg-ivory-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500";

const primaryClass =
  "rounded-full bg-ocean-900 px-4 py-2 text-sm font-medium text-ivory-50 transition hover:bg-ocean-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500";

export function StatusActions({ id, status, slug }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {status !== "published" ? (
        <form action={setArticleStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="intent" value="publish" />
          <button type="submit" className={primaryClass}>
            Terbitkan
          </button>
        </form>
      ) : (
        <Link
          href={`/journal/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-ocean-700 underline-offset-2 hover:underline"
        >
          Lihat di Journal ↗
        </Link>
      )}

      {status !== "draft" ? (
        <form action={setArticleStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="intent" value="draft" />
          <button type="submit" className={buttonClass}>
            Jadikan draft
          </button>
        </form>
      ) : null}

      {status !== "archived" ? (
        <form action={setArticleStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="intent" value="archive" />
          <button type="submit" className={buttonClass}>
            Arsipkan
          </button>
        </form>
      ) : null}
    </div>
  );
}
