import Image from "next/image";
import Link from "next/link";
import heroScene from "@/public/images/novia-hero-scene.jpg";
import { LiveClock } from "@/components/LiveClock";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-svh overflow-hidden">
        <Image
          src={heroScene}
          alt="Novia membaca buku di teras tepi laut saat matahari terbenam"
          placeholder="blur"
          preload
          fill
          sizes="100vw"
          className="object-cover object-[22%_center] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(253_251_246/0.75)_0%,rgb(253_251_246/0.45)_30%,transparent_48%)] md:bg-[radial-gradient(ellipse_at_50%_30%,rgb(253_251_246/0.45),transparent_45%)]"
        />

        <div className="relative flex flex-col items-center px-5 pt-20 text-center sm:pt-24">
          <p className="font-serif text-sm tracking-[0.35em] text-ocean-900 uppercase sm:text-lg">
            Novia Studio
          </p>
          <span aria-hidden="true" className="my-4 h-px w-8 bg-ocean-900/50 sm:my-5" />
          <h1 className="text-ocean-900">
            <span className="block font-serif text-5xl leading-none sm:text-7xl lg:text-8xl">
              A Little More
            </span>
            <span className="-mt-1 block font-script text-6xl leading-none sm:ml-32 sm:text-8xl lg:text-9xl">
              Human.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base text-ink/80 sm:text-xl">
            Stories, feelings, and everything in between.
          </p>
          <Link
            href="/journal"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-ivory-50/85 px-6 py-3 font-serif text-lg text-ink shadow-sm backdrop-blur-sm transition hover:bg-ivory-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
          >
            Explore the journal <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <p className="absolute top-24 right-10 hidden -rotate-6 font-script text-3xl leading-tight text-ink/75 lg:block">
          A softer place
          <br />
          to think,
          <br />
          feel, and
          <br />
          begin again.
        </p>

        <p className="absolute top-[36%] left-6 hidden font-serif text-[11px] leading-relaxed tracking-[0.2em] text-ink/70 uppercase lg:block">
          Same thoughts,
          <br />
          a brighter
          <br />
          tomorrow.
        </p>

        <div className="absolute bottom-36 left-6 hidden rounded-2xl border border-white/50 bg-ivory-50/60 px-4 py-3 text-sm text-ink/85 backdrop-blur-md lg:block">
          <p>Kediri, Indonesia</p>
          <span aria-hidden="true" className="my-2 block h-px w-6 bg-ink/40" />
          <LiveClock />
          <p className="mt-2 font-script text-3xl leading-tight">
            Good ideas
            <br />
            take time.
          </p>
        </div>
      </section>
    </main>
  );
}
