"use client";
/**
 * ============================================
 * COMPONENTE DE CAPA DO LIVRO
 * ============================================
 *
 * Página de capa com placeholder visual responsivo.
 */

import { useEbookStore } from "../../store/useEbookStore";
import { getTranslation } from "../../lib/translations";
import { bookConfig } from "../../lib/book-config";
import { ImageIcon } from "lucide-react";
import { BookCover } from "../book-cover";

const Cover = () => {
  const language = useEbookStore((state) => state.language);
  const t = getTranslation(language);
  const { typography } = bookConfig;

  return (
    <div
      className="
        flex items-center justify-center 
        min-h-full h-full w-full 
        px-4 sm:px-6 py-4 sm:py-5 my-auto
      "
    >
      {/* CONTAINER DA CAPA */}
      <BookCover />
      {/* <div
        className="
          w-full max-w-[280px] sm:max-w-md 
          aspect-[3/4] 
          rounded-lg 
          border-2 border-dashed border-muted-foreground/30
          bg-muted/30
          flex flex-col items-center justify-center
          gap-3 sm:gap-4
          transition-colors duration-300
          hover:border-muted-foreground/50
          hover:bg-muted/50
        "
      >
        <ImageIcon
          className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/50"
          strokeWidth={1.5}
        />
        <p
          className={`${typography.uiFont} text-xs sm:text-sm text-muted-foreground text-center px-4`}
        >
          {t.ui.coverPlaceholder}
        </p>
        <p
          className={`${typography.uiFont} text-[10px] sm:text-xs text-muted-foreground/60 text-center px-4`}
        >
          {t.ui.coverInstruction}
        </p>
      </div> */}

      {/* INFORMAÇÕES DO LIVRO */}
      {/* <div className="mt-6 sm:mt-8 text-center space-y-2 sm:space-y-3">
        <h1
          className={`
            ${typography.headingFont}
            text-2xl sm:text-3xl md:text-4xl 
            font-bold 
            text-foreground
            tracking-tight
          `}
        >
          {t.book.title}
        </h1>

        <p
          className={`
            ${typography.uiFont}
            text-base sm:text-lg 
            text-muted-foreground
          `}
        >
          {t.book.author}
        </p>

        <p
          className={`
            ${typography.uiFont}
            text-xs sm:text-sm 
            text-muted-foreground/70
          `}
        >
          {t.book.edition}
        </p>
      </div> */}

      {/* <BookCover /> */}
    </div>
  );
};

export default Cover;
