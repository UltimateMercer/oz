// "use client";
// /**
//  * ============================================
//  * COMPONENTE DE CAPÍTULO
//  * ============================================
//  *
//  * Página de capítulo com tipografia responsiva.
//  */

// import {
//   useEbookStore,
//   type FontSize,
//   type FontFamily,
// } from "../../store/useEbookStore";
// import { getTranslation } from "../../lib/translations";
// import { bookConfig } from "../../lib/book-config";

// interface ChapterProps {
//   chapterIndex: number;
// }

// // Mapeamento de tamanhos de fonte (usando modificadores prose)
// const fontSizeClasses: Record<FontSize, string> = {
//   normal: "prose-base sm:prose-lg",
//   large: "prose-lg sm:prose-xl",
//   xlarge: "prose-xl sm:prose-2xl",
// };

// // Mapeamento de famílias de fonte
// const fontFamilyClasses: Record<FontFamily, string> = {
//   serif: "font-serif",
//   sans: "font-sans",
// };

// const Chapter = ({ chapterIndex }: ChapterProps) => {
//   const language = useEbookStore((state) => state.language);
//   const fontSize = useEbookStore((state) => state.fontSize);
//   const fontFamily = useEbookStore((state) => state.fontFamily);
//   const t = getTranslation(language);
//   const { typography, layout } = bookConfig;
//   const chapter = t.chapters[chapterIndex];

//   if (!chapter) {
//     return (
//       <div className="flex items-center justify-center min-h-full">
//         <p className="text-muted-foreground">Capítulo não encontrado</p>
//       </div>
//     );
//   }

//   return (
//     <article
//       className="
//         flex flex-col
//         w-full
//         px-4 md:px-16 sm:px-6 py-6 sm:py-8
//         border border-[#252525] dark:border-[#eaeaea] mt-8
//         max-w-3xl mx-auto
//         background-texture
//         bg-[#fbf0d9] dark:bg-[#252525]
//       "
//       // style={{ maxWidth: `${layout.maxContentWidth}px`, margin: "0 auto" }}
//     >
//       {/* CABEÇALHO */}
//       <header className="mb-6 sm:mb-8 text-center">
//         <p
//           className={`
//             ${typography.uiFont}
//             text-xs sm:text-sm
//             uppercase
//             tracking-widest
//             text-muted-foreground
//             mb-2
//           `}
//         >
//           {t.ui.chapter} {chapter.number}
//         </p>

//         <h1
//           className={`
//             ${typography.headingFont}
//             text-xl sm:text-2xl md:text-3xl
//             font-bold
//             text-foreground
//           `}
//         >
//           {chapter.title}
//         </h1>

//         <div
//           className="
//             mt-4 sm:mt-6
//             mx-auto
//             w-12 sm:w-16
//             h-px
//             bg-border
//           "
//         />
//       </header>

//       {/* CONTEÚDO */}
//       <div
//         className={`
//           prose dark:prose-invert
//           ${fontFamilyClasses[fontFamily]}
//           ${fontSizeClasses[fontSize]}
//           prose-p:text-justify
//           prose-p:text-foreground
//           max-w-none
//         `}
//       >
//         {chapter.content.map((paragraph, index) => (
//           <p key={index}>{paragraph}</p>
//         ))}
//       </div>

//       {/* RODAPÉ */}
//       <footer className="mt-auto pt-8 sm:pt-12">
//         <div
//           className="
//             mx-auto
//             w-6 sm:w-8
//             h-px
//             bg-border
//           "
//         />
//       </footer>
//     </article>
//   );
// };

// export default Chapter;
"use client";
/**
 * ============================================
 * COMPONENTE DE CAPÍTULO
 * ============================================
 *
 * Página de capítulo com tipografia responsiva.
 */

import {
  useEbookStore,
  type FontSize,
  type FontFamily,
} from "../../store/useEbookStore";
import { getTranslation } from "../../lib/translations";
import { bookConfig } from "../../lib/book-config";

interface ChapterProps {
  chapterIndex: number;
}

// Mapeamento de tamanhos de fonte (usando modificadores prose)
const fontSizeClasses: Record<FontSize, string> = {
  normal: "prose-base sm:prose-lg",
  large: "prose-lg sm:prose-xl",
  xlarge: "prose-xl sm:prose-2xl",
};

// Mapeamento de famílias de fonte
const fontFamilyClasses: Record<FontFamily, string> = {
  serif: "font-serif",
  sans: "font-lexend",
};

const Chapter = ({ chapterIndex }: ChapterProps) => {
  const language = useEbookStore((state) => state.language);
  const fontSize = useEbookStore((state) => state.fontSize);
  const fontFamily = useEbookStore((state) => state.fontFamily);
  const t = getTranslation(language);
  const { typography, layout } = bookConfig;
  const chapter = t.chapters[chapterIndex];

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-muted-foreground">Capítulo não encontrado</p>
      </div>
    );
  }

  return (
    <article
      className="
        flex flex-col 
        w-full 
        px-5 md:px-16 sm:px-6 py-6 sm:py-8
        md:border md:border-[#252525] md:dark:border-[#eaeaea] mt-8
        max-w-3xl mx-auto
        background-texture
        bg-[#fff9ea] dark:bg-[#252525]
        md:shadow-xl mb-8
      "
    >
      {/* CABEÇALHO */}
      <header className="mb-6 sm:mb-8 text-center">
        <p
          className={`
            ${typography.uiFont}
            text-xs sm:text-sm 
            uppercase 
            tracking-widest
            text-muted-foreground
            mb-2
          `}
        >
          {t.ui.chapter} {chapter.number}
        </p>

        <h1
          className={`
            ${typography.headingFont}
            text-xl sm:text-2xl md:text-3xl 
            font-bold 
            text-foreground
            tracking-wider
          `}
        >
          {chapter.subtitle}
        </h1>

        <div
          className="
            mt-4 
            mx-auto 
            w-20 sm:w-24 
            h-px 
            bg-foreground
          "
        />
      </header>

      {/* CONTEÚDO */}
      <div
        className={`
          prose dark:prose-invert
          ${fontFamilyClasses[fontFamily]}
          ${fontSizeClasses[fontSize]}
          prose-p:text-justify
          prose-p:text-foreground
          max-w-none
        `}
      >
        {chapter.content.map((item, index) => {
          // Renderiza texto
          if (item.type === "text") {
            return <p key={index}>{item.value}</p>;
          }

          // Renderiza imagem
          if (item.type === "image") {
            return (
              <figure key={index} className="my-6">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full grayscale-90 fade-edges"
                />
                {item.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          return null;
        })}
      </div>

      {/* RODAPÉ */}
      <footer className="mt-auto pt-8 sm:pt-12">
        <div
          className="
            mx-auto 
            w-8 sm:w-12 
            h-px 
            bg-foreground
          "
        />
      </footer>
    </article>
  );
};

export default Chapter;
