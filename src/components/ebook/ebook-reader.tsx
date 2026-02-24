"use client";
/**
 * ============================================
 * COMPONENTE PRINCIPAL DO LEITOR DE EBOOK
 * ============================================
 *
 * Container principal com navegação por gestos,
 * animações Motion e responsividade mobile.
 */

import { useCallback, useRef, useState, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, AnimatePresence } from "motion/react";
import { useEbookStore } from "@/store/useEbookStore";
import { getTranslation } from "@/lib/translations";
import { bookConfig } from "@/lib/book-config";
import Navbar from "./navbar";
import NavigationButtons from "./navigation-buttons";
import Cover from "./cover";
import TableOfContents from "./table-of-contents";
import Chapter from "./chapter";
import HelpGuide from "./help-guide";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextureOverlay } from "../ui/texture-overlay";
import Backcover from "./backcover";

// ============================================
// VARIANTES DE ANIMAÇÃO MOTION
// ============================================

const pageVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const pageTransition = {
  x: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.25 },
};

const EbookReader = () => {
  // ---- Estado Global ----
  const currentPage = useEbookStore((state) => state.currentPage);
  const totalPages = useEbookStore((state) => state.totalPages);
  const language = useEbookStore((state) => state.language);
  const navigationDirection = useEbookStore(
    (state) => state.navigationDirection,
  );
  const hasSeenGuide = useEbookStore((state) => state.hasSeenGuide);
  const nextPage = useEbookStore((state) => state.nextPage);
  const prevPage = useEbookStore((state) => state.prevPage);
  const setTotalPages = useEbookStore((state) => state.setTotalPages);
  const setHasSeenGuide = useEbookStore((state) => state.setHasSeenGuide);

  // ---- Estado Local para Drag ----
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ---- Estado Local para Guia de Ajuda ----
  const [showGuide, setShowGuide] = useState(false);

  // ---- Exibir guia automaticamente na primeira visita ----
  useEffect(() => {
    // Pequeno delay para garantir que a hidratação do zustand terminou
    const timer = setTimeout(() => {
      if (!hasSeenGuide) {
        setShowGuide(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [hasSeenGuide]);

  // ---- Handler para fechar o guia ----
  const handleGuideClose = (open: boolean) => {
    setShowGuide(open);
    if (!open) {
      setHasSeenGuide(true);
    }
  };

  // ---- Tradução e Configuração ----
  const t = getTranslation(language);
  const { layout, gesture } = bookConfig;

  // ---- Referência para o Container ----
  const containerRef = useRef<HTMLDivElement>(null);

  // ---- Scroll para o topo ao mudar de página ----
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // ---- Navegacao por teclado ----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  // ---- Atualizar Total de Páginas ----
  const totalPagesCalculated = 2 + t.chapters.length + 1;
  if (totalPages !== totalPagesCalculated) {
    setTotalPages(totalPagesCalculated);
  }

  // ---- Handler de Navegação ----
  const handleNavigate = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Micro-loading: pequeno delay para feedback visual
      setTimeout(() => {
        if (direction === "next") {
          nextPage();
        } else {
          prevPage();
        }
        setIsTransitioning(false);
      }, 100);
    },
    [nextPage, prevPage, isTransitioning],
  );

  // ---- Configuração do Gesto de Drag ----
  const bind = useDrag(
    ({
      movement: [mx],
      direction: [dx],
      velocity: [vx],
      down,
      last,
      event,
    }) => {
      // Bloqueia durante transição
      if (isTransitioning) return;

      // Prevenção de conflito com scroll vertical
      if (gesture.preventVerticalConflict) {
        const target = event.target as HTMLElement;
        const scrollableParent = target.closest('[data-scrollable="true"]');
        if (scrollableParent) {
          const { scrollTop, scrollHeight, clientHeight } =
            scrollableParent as HTMLElement;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          if (!isAtTop && !isAtBottom) {
            return;
          }
        }
      }

      // Durante o drag: feedback visual com resistência
      if (down) {
        setIsDragging(true);
        // Aplica resistência de 40% para sensação natural
        const resistance = 0.4;
        // Limita o offset máximo a 150px
        const clampedOffset = Math.max(-150, Math.min(150, mx * resistance));
        setDragOffset(clampedOffset);
      }

      // Ao soltar: verifica se deve navegar
      if (last) {
        setIsDragging(false);
        setDragOffset(0);

        const swipeThreshold = gesture.swipeThreshold;
        const swipeVelocity = gesture.swipeVelocity;

        // Só navega se passou do threshold OU tem velocidade alta
        const shouldNavigate =
          Math.abs(mx) > swipeThreshold || Math.abs(vx) > swipeVelocity;

        if (shouldNavigate) {
          // dx < 0 = arrastou para esquerda = próxima página
          // dx > 0 = arrastou para direita = página anterior
          if (dx < 0) {
            handleNavigate("next");
          } else if (dx > 0) {
            handleNavigate("prev");
          }
        }
      }
    },
    {
      axis: "x",
      filterTaps: true,
      enabled: gesture.enableDrag,
    },
  );

  // ---- Renderização da Página Atual ----
  const renderCurrentPage = () => {
    if (currentPage === 0) {
      return <Cover />;
    }
    if (currentPage === 1) {
      return <TableOfContents />;
    }

    if (currentPage === totalPages - 1) {
      return <Backcover />;
    }
    const chapterIndex = currentPage - 2;
    console.log("Renderizando capítulo:", currentPage, "->", chapterIndex);
    return <Chapter chapterIndex={chapterIndex} />;
  };

  return (
    <div
      className="
        relative 
        min-h-screen 
        w-full 
        bg-[#fff9ea] dark:bg-[#252525] 
        background-texture
        text-foreground
        overflow-hidden
      "
    >
      <TextureOverlay
        texture={"grid"}
        className="mix-blend-overlay"
        opacity={1}
      />

      {/* NAVBAR */}
      <Navbar />

      {/* CONTEÚDO PRINCIPAL */}
      <main
        ref={containerRef}
        {...bind()}
        className={`
          w-full
          overflow-y-auto
          overflow-x-hidden
          touch-pan-y
          relative
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          select-none
        `}
        style={{
          height: `calc(100vh - ${layout.navbarHeight}px - ${layout.navigationButtonsHeight}px)`,
          marginTop: `${layout.navbarHeight}px`,
          marginBottom: `${layout.navigationButtonsHeight}px`,
        }}
      >
        {/* Indicador de transição */}
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/30 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}

        {/* Indicadores visuais durante drag */}
        <AnimatePresence>
          {isDragging && dragOffset < -20 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(1, Math.abs(dragOffset) / 100) }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary/20 to-transparent flex items-center justify-end pr-4 pointer-events-none z-40"
            >
              <ChevronRight className="w-8 h-8 text-primary/70" />
            </motion.div>
          )}
          {isDragging && dragOffset > 20 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(1, Math.abs(dragOffset) / 100) }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary/20 to-transparent flex items-center pl-4 pointer-events-none z-40"
            >
              <ChevronLeft className="w-8 h-8 text-primary/70" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Container com AnimatePresence para transições suaves */}
        <AnimatePresence
          initial={false}
          custom={navigationDirection}
          mode="wait"
        >
          <motion.div
            key={currentPage}
            custom={navigationDirection}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            style={{
              // Aplica offset visual durante drag
              x: isDragging ? dragOffset : 0,
              scale: isDragging ? 0.98 : 1,
            }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* BOTÕES DE NAVEGAÇÃO */}
      <NavigationButtons />

      {/* GUIA DE AJUDA (primeira visita) */}
      <HelpGuide open={showGuide} onOpenChange={handleGuideClose} />
    </div>
  );
};

export default EbookReader;
