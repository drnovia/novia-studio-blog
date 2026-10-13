import type { Metadata } from "next";
import { Allura, Geist, Instrument_Serif } from "next/font/google";
import { Dock } from "@/components/Dock";
import { MenuBar } from "@/components/MenuBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "NOVIA STUDIO — A Little More Human.",
    template: "%s — NOVIA STUDIO",
  },
  description: "NOVIA STUDIO. A Little More Human. Stories, feelings, and everything in between.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <MenuBar />
        {children}
        <Dock />
      </body>
    </html>
  );
}
