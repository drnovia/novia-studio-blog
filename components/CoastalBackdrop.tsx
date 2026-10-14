import Image from "next/image";
import background from "@/public/images/about/background.jpg";

export function CoastalBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src={background}
        alt=""
        placeholder="blur"
        preload
        fill
        sizes="100vw"
        className="object-cover object-[50%_65%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(253_251_246/0.72)_0%,rgb(253_251_246/0.4)_40%,rgb(19_50_74/0.12)_100%)]" />
    </div>
  );
}
