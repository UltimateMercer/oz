"use client";

/**
 * ============================================
 * COMPONENTE DE BOTÕES DE NAVEGAÇÃO
 * ============================================
 *
 * Botões fixos na parte inferior com áreas de toque
 * adequadas para mobile (min 44x44px).
 */

import { useEbookStore } from "@/store/useEbookStore";
import { getTranslation } from "@/lib/translations";
import { bookConfig } from "@/lib/book-config";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButtons = () => {
  // ---- Estado Global ----
  const currentPage = useEbookStore((state) => state.currentPage);
  const totalPages = useEbookStore((state) => state.totalPages);
  const language = useEbookStore((state) => state.language);
  const nextPage = useEbookStore((state) => state.nextPage);
  const prevPage = useEbookStore((state) => state.prevPage);

  // ---- Tradução e Configuração ----
  const t = getTranslation(language);
  const { layout, typography } = bookConfig;

  // ---- Estados de Navegação ----
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <footer
      className="
        fixed bottom-0 left-0 right-0 z-2
        flex items-center justify-between
        px-2.25 sm:px-4
        bg-[#fff9ea] dark:bg-[#252525]
        border-t border-[#252525] dark:border-[#eaeaea]
      "
      style={{ height: `${layout.navigationButtonsHeight}px` }}
    >
      {/* BOTÃO ANTERIOR */}
      <Button
        variant="ghost"
        onClick={prevPage}
        disabled={isFirstPage}
        className={`
          ${typography.uiFont}
          gap-1 sm:gap-2
          min-h-[44px] min-w-[44px]
          px-2 sm:px-4
          ${isFirstPage ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden xs:inline sm:inline">{t.ui.previous}</span>
      </Button>

      {/* INDICADOR DE PÁGINA */}
      <span
        className={`
          ${typography.uiFont}
          text-xs sm:text-sm 
          text-muted-foreground
        `}
      >
        {currentPage + 1} / {totalPages}
      </span>

      {/* BOTÃO PRÓXIMO */}
      <Button
        variant="ghost"
        onClick={nextPage}
        disabled={isLastPage}
        className={`
          ${typography.uiFont}
          gap-1 sm:gap-2
          min-h-[44px] min-w-[44px]
          px-2 sm:px-4
          ${isLastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}
        `}
      >
        <span className="hidden xs:inline sm:inline">{t.ui.next}</span>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </footer>
  );
};

export default NavigationButtons;
