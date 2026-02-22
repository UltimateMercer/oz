"use client";
import Image from "next/image";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useEbookStore } from "@/store/useEbookStore";

export const BookCover = ({ className = "" }: { className?: string }) => {
  const language = useEbookStore((state) => state.language);
  const t = getTranslation(language);
  return (
    <div
      className={cn(
        "relative border border-[#252525] dark:border-[#eaeaea] max-w-3xl w-full h-[calc(100vh-120px)] max-h-[calc(100vh-160px)] background-texture",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full bg-cover bg-center sepia-25 overflow-hidden",
          className,
        )}
        style={{
          backgroundImage: "url(book/oz-cover.png)",
        }}
      ></div>
      <div className="absolute inset-0 md:px-12 px-6 py-8 flex flex-col justify-end z-10 bg-linear-to-b from-transparent from-35% to-black/90 text-[#eaeaea]">
        <h1 className="text-5xl font-bold font-serif-display tracking-wider">
          {t.book.title}
        </h1>
        <div className="w-24 h-1 bg-[#eaeaea] my-4"></div>
        <h5 className="text-xl font-serif-display">{t.book.author}</h5>
        <Image
          src="/images/ultimate-logo-dark.svg"
          alt={"Ultimate Mercer Logo"}
          width={56}
          height={56}
          className="invert mx-auto"
        />
      </div>
    </div>
  );
};
