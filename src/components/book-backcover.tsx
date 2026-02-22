"use client";
import Image from "next/image";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { useEbookStore } from "@/store/useEbookStore";

export const BookBackcover = ({ className = "" }: { className?: string }) => {
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
          "relative h-full bg-cover bg-center grayscale opacity-75 overflow-hidden",
          className,
        )}
        style={{
          backgroundImage: "url(book/oz-cover.png)",
        }}
      ></div>
      <div className="absolute inset-0 md:px-12 px-6 pt-12 pb-8 flex flex-col z-10 bg-[#252525]/50 text-[#eaeaea]">
        <h1 className="text-3xl font-bold font-serif-display tracking-wider">
          {t.book.title}
        </h1>
        <div className="w-24 h-1 bg-[#eaeaea] my-4"></div>
        <h5 className="text-xl font-serif-display">{t.book.author}</h5>
        <p className="text-lg font-serif-display mt-4">
          Ebook: Julian Silva da Cunha
        </p>
        <Image
          src="/images/ultimate-logo-dark.svg"
          alt={"Ultimate Mercer Logo"}
          width={56}
          height={56}
          className="invert mx-auto mt-auto"
        />
      </div>
    </div>
  );
};
