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
import { Book, ImageIcon } from "lucide-react";
import { BookCover } from "../book-cover";
import { BookBackcover } from "../book-backcover";

const Backcover = () => {
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
      <BookBackcover />
    </div>
  );
};

export default Backcover;
