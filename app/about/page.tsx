import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <PagePlaceholder title="About" />;
}
