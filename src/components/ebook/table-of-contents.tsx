"use client";
/**
 * ============================================
 * COMPONENTE DE SUMÁRIO
 * ============================================
 *
 * Página de sumário com lista clicável responsiva.
 */

import { useEbookStore } from "@/store/useEbookStore";
import { getTranslation } from "@/lib/translations";
import { bookConfig } from "@/lib/book-config";
import { ChevronRight } from "lucide-react";

const TableOfContents = () => {
  const language = useEbookStore((state) => state.language);
  const goToChapter = useEbookStore((state) => state.goToChapter);
  const t = getTranslation(language);
  const { typography } = bookConfig;

  return (
    <div
      className="
        flex flex-col 
        w-full max-w-3xl mx-auto
        md:border md:border-[#252525] md:dark:border-[#eaeaea] mt-8
        background-texture
        bg-[#fff9ea] dark:bg-[#252525]
        px-4 sm:px-6 py-6 sm:py-8
      "
    >
      {/* TÍTULO */}
      <h2
        className={`
          ${typography.headingFont}
          text-xl sm:text-2xl md:text-3xl 
          font-bold 
          text-foreground
          mb-6 sm:mb-8
          text-center
          tracking-wider
        `}
      >
        {t.ui.tocTitle}
      </h2>

      {/* LISTA DE CAPÍTULOS */}
      <nav className="flex flex-col gap-1 sm:gap-2 max-w-lg mx-auto w-full">
        {t.chapters.map((chapter, index) => (
          <button
            type="button"
            key={chapter.number}
            onClick={() => goToChapter(index)}
            className="
              group
              flex items-center justify-between
              w-full px-3 sm:px-4 py-3 sm:py-4
              rounded
              text-left
              bg-transparent
              hover:bg-[#252525] hover:text-[#eaeaea] dark:hover:bg-[#eaeaea] dark:hover:text-[#252525]
              transition-colors duration-200
              border border-transparent
              hover:border-border
              cursor-pointer
              min-h-12
            "
          >
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span
                className={`
                  ${typography.uiFont}
                  text-xs sm:text-sm 
                  text-muted-foreground
                  font-medium
                  min-w-[2.5rem] sm:min-w-[3rem]
                `}
              >
                {t.ui.chapter} {chapter.number}
              </span>

              <span
                className={`
                  ${typography.headingFont}
                  text-lg sm:text-xl
                  tracking-wide 
                  group-hover:text-[#eaeaea]
                  dark:group-hover:text-[#252525]
                  transition-colors duration-200
                `}
              >
                {chapter.subtitle}
              </span>
            </div>

            <ChevronRight
              className="
                w-4 h-4 sm:w-5 sm:h-5 
                text-muted-foreground
                opacity-0 
                group-hover:opacity-100
                transform translate-x-0
                group-hover:translate-x-1
                transition-all duration-200
              "
            />
          </button>
        ))}
      </nav>

      {/* RODAPÉ */}
      <div className="mt-auto pt-6 sm:pt-8 text-center">
        <p
          className={`
            ${typography.uiFont}
            text-xs sm:text-sm 
            text-muted-foreground/60
          `}
        >
          {t.book.edition}
        </p>
      </div>
    </div>
  );
};

export default TableOfContents;
