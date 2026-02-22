/**
 * ============================================
 * STORE ZUSTAND - GERENCIAMENTO DE ESTADO
 * ============================================
 *
 * Este arquivo gerencia todo o estado global do leitor de ebook.
 * Agora com persistência automática no localStorage!
 *
 * ESTADOS DISPONÍVEIS:
 * - currentPage: Página atual (0 = capa, 1 = sumário, 2+ = capítulos)
 * - language: Idioma selecionado ('pt' ou 'en')
 * - theme: Tema atual ('light' ou 'dark')
 * - navigationDirection: Direção numérica para animações (1 = próxima, -1 = anterior)
 *
 * PERSISTÊNCIA:
 * - currentPage, language e theme são salvos automaticamente no localStorage
 * - Ao reabrir o app, o usuário retorna onde parou
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================
// TIPOS
// ============================================

/** Idiomas suportados */
export type Language = "pt" | "en";

/** Temas suportados */
export type Theme = "light" | "dark";

/** Tamanhos de fonte suportados */
export type FontSize = "normal" | "large" | "xlarge";

/** Famílias de fonte suportadas */
export type FontFamily = "serif" | "sans";

/**
 * Direção da navegação para animações
 * 1 = próxima página (entra da direita)
 * -1 = página anterior (entra da esquerda)
 * 0 = sem animação direcional
 */
export type NavigationDirection = 1 | -1 | 0;

/** Interface do estado do ebook */
interface EbookState {
  // ---- Estados ----
  currentPage: number;
  language: Language;
  theme: Theme;
  fontSize: FontSize;
  fontFamily: FontFamily;
  totalPages: number;
  /** Direção da última navegação (para animação) */
  navigationDirection: NavigationDirection;
  /** Se o usuário já viu o guia de ajuda */
  hasSeenGuide: boolean;

  // ---- Ações ----
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (family: FontFamily) => void;
  goToCover: () => void;
  goToTableOfContents: () => void;
  goToChapter: (chapterIndex: number) => void;
  setTotalPages: (total: number) => void;
  /** Reseta a direção após animação */
  resetNavigationDirection: () => void;
  /** Marca que o usuário já viu o guia */
  setHasSeenGuide: (seen: boolean) => void;
}

// ============================================
// STORE COM PERSISTÊNCIA
// ============================================

export const useEbookStore = create<EbookState>()(
  persist(
    (set, get) => ({
      // ---- Estados iniciais ----
      currentPage: 0,
      language: "pt",
      theme: "light",
      fontSize: "normal",
      fontFamily: "serif",
      totalPages: 7,
      navigationDirection: 0,
      hasSeenGuide: false,

      // ---- Ações ----

      setCurrentPage: (page) => {
        const { totalPages, currentPage } = get();
        const validPage = Math.max(0, Math.min(page, totalPages - 1));
        const direction =
          validPage > currentPage ? 1 : validPage < currentPage ? -1 : 0;
        set({ currentPage: validPage, navigationDirection: direction });
      },

      nextPage: () => {
        const { currentPage, totalPages } = get();
        if (currentPage < totalPages - 1) {
          set({ currentPage: currentPage + 1, navigationDirection: 1 });
        }
      },

      prevPage: () => {
        const { currentPage } = get();
        if (currentPage > 0) {
          set({ currentPage: currentPage - 1, navigationDirection: -1 });
        }
      },

      setLanguage: (lang) => set({ language: lang }),

      setFontSize: (size) => set({ fontSize: size }),

      setFontFamily: (family) => set({ fontFamily: family }),

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      setTheme: (theme) => {
        set({ theme });
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      goToCover: () => {
        const { currentPage } = get();
        const direction = currentPage > 0 ? -1 : 0;
        set({ currentPage: 0, navigationDirection: direction });
      },

      goToTableOfContents: () => {
        const { currentPage } = get();
        const direction = currentPage > 1 ? -1 : currentPage < 1 ? 1 : 0;
        set({ currentPage: 1, navigationDirection: direction });
      },

      goToChapter: (chapterIndex) => {
        const { totalPages, currentPage } = get();
        const targetPage = chapterIndex + 2;
        if (targetPage < totalPages) {
          const direction =
            targetPage > currentPage ? 1 : targetPage < currentPage ? -1 : 0;
          set({ currentPage: targetPage, navigationDirection: direction });
        }
      },

      setTotalPages: (total) => set({ totalPages: total }),

      resetNavigationDirection: () => set({ navigationDirection: 0 }),

      setHasSeenGuide: (seen) => set({ hasSeenGuide: seen }),
    }),
    {
      name: "ebook-reading-progress",
      // Só persiste esses campos
      partialize: (state) => ({
        currentPage: state.currentPage,
        language: state.language,
        theme: state.theme,
        fontSize: state.fontSize,
        fontFamily: state.fontFamily,
        hasSeenGuide: state.hasSeenGuide,
      }),
      // Aplica o tema ao carregar do localStorage
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    },
  ),
);
