import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { CoastalBackdrop } from "@/components/CoastalBackdrop";
import dolphins from "@/public/images/about/dolphins.jpg";
import flamingo from "@/public/images/about/flamingo.jpg";
import sunset from "@/public/images/about/sunset.jpg";

export const metadata: Metadata = {
  title: "About",
  description: "A space for thoughts, stories, and everything in between.",
};

type Card = {
  number: string;
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
};

const cards: Card[] = [
  {
    number: "01",
    title: "A quieter space.",
    body: "A place to slow down, write things out, and keep the little moments that mean something — even if they don’t have a bigger purpose.",
    image: sunset,
    alt: "Matahari terbenam memantulkan cahaya keemasan di laut yang tenang",
  },
  {
    number: "02",
    title: "What you’ll find here.",
    body: "Personal reflections, everyday observations, and stories that feel worth writing down. Nothing too serious, just real.",
    image: dolphins,
    alt: "Dua lumba-lumba berenang di bawah laut biru dengan cahaya matahari dari permukaan",
  },
  {
    number: "03",
    title: "Different thoughts, same ocean.",
    body: "If something here resonates, I hope it reminds you to write down what’s on your mind too.",
    image: flamingo,
    alt: "Seekor flamingo berdiri di tepi laut saat matahari terbenam",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-svh overflow-x-clip">
      <CoastalBackdrop />

      <section className="flex flex-col items-center px-5 pt-20 text-center sm:pt-28">
        <p className="font-serif text-sm tracking-[0.35em] text-ocean-900 uppercase sm:text-lg">
          Novia Studio
        </p>
        <span aria-hidden="true" className="my-4 h-px w-8 bg-coral-400 sm:my-5" />
        <h1 className="text-ocean-900">
          <span className="block font-serif text-6xl leading-none sm:text-8xl lg:text-9xl">
            About,
          </span>
          <span className="mt-1 block font-script text-5xl leading-tight sm:text-7xl lg:text-8xl">
            but make it personal.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-balance text-ink/80 sm:text-xl">
          A space for thoughts, stories, and everything in between.
        </p>
      </section>

      <section
        aria-label="Tentang Novia Studio"
        className="mx-auto mt-12 grid max-w-xl gap-6 px-5 pb-32 sm:mt-16 sm:pb-40 lg:max-w-6xl lg:grid-cols-3"
      >
        {cards.map((card) => (
          <article
            key={card.number}
            className="flex flex-col rounded-3xl bg-ivory-50 p-5 shadow-[0_12px_40px_rgb(19_50_74/0.14)] sm:p-6"
          >
            <Image
              src={card.image}
              alt={card.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 520px, 100vw"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <div className="mt-5 border-t border-ocean-900/10 pt-5">
              <p aria-hidden="true" className="text-xs font-semibold tracking-[0.3em] text-coral-400">
                {card.number}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-ocean-900">{card.title}</h2>
              <p className="mt-3 text-base leading-7 text-ink/85">{card.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
