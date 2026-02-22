/**
 * ============================================
 * TRADUÇÕES E CONTEÚDO DO LIVRO
 * ============================================
 *
 * Este arquivo contém TODO o texto do leitor de ebook.
 * Modifique aqui para:
 * - Traduzir a interface para outros idiomas
 * - Adicionar ou editar o conteúdo dos capítulos
 * - Personalizar textos de botões e labels
 *
 * ESTRUTURA:
 * - ui: Textos da interface (botões, labels, tooltips)
 * - book: Metadados do livro (título, autor)
 * - chapters: Array com todos os capítulos
 *
 * PARA ADICIONAR UM NOVO IDIOMA:
 * 1. Copie a estrutura de 'pt' ou 'en'
 * 2. Traduza todos os textos
 * 3. Adicione o novo idioma no tipo Language em useEbookStore.ts
 */

import { chapter1PT, chapter1EN } from "@/data/chapter-1-cut";
import { chapter2PT, chapter2EN } from "@/data/chapter-2-cut";
import { chapter3PT, chapter3EN } from "@/data/chapter-3-cut";
import { chapter4PT, chapter4EN } from "@/data/chapter-4-cut";
import type { ReactNode } from "react";

// ============================================
// INTERFACE DE TIPOS
// ============================================

export interface Chapter {
  subtitle: ReactNode;
  /** Número do capítulo (para exibição) */
  number: number;
  /** Título do capítulo */
  title: string;
  /** Conteúdo do capítulo - array de parágrafos */
  content: any[]; // Pode ser string ou objetos mais complexos para formatação avançada
}

export interface Translation {
  ui: {
    /** Botão para ir à capa */
    cover: string;
    /** Botão para ir ao sumário */
    tableOfContents: string;
    /** Botão anterior */
    previous: string;
    /** Botão próximo */
    next: string;
    /** Label do tema */
    theme: string;
    /** Label do idioma */
    language: string;
    /** Texto "Capítulo" */
    chapter: string;
    /** Título do sumário */
    tocTitle: string;
    /** Placeholder da capa */
    coverPlaceholder: string;
    /** Instrução da capa */
    coverInstruction: string;
    /** Label de configurações */
    settings: string;
    /** Label de tipografia */
    typography: string;
    /** Label de tamanho de fonte */
    fontSize: string;
    /** Label de família de fonte */
    fontFamily: string;
    /** Tamanho normal */
    fontNormal: string;
    /** Tamanho grande */
    fontLarge: string;
    /** Tamanho extra grande */
    fontXLarge: string;
    /** Fonte serifada */
    fontSerif: string;
    /** Fonte sans-serif */
    fontSans: string;
  };
  book: {
    /** Título do livro */
    title: string;
    /** Autor do livro */
    author: string;
    /** Edição */
    edition: string;
  };
  /** Array de capítulos */
  chapters: Chapter[];
}

// ============================================
// TRADUÇÕES EM PORTUGUÊS
// ============================================

const pt: Translation = {
  // ---- Textos da Interface ----
  ui: {
    cover: "Capa",
    tableOfContents: "Sumário",
    previous: "Anterior",
    next: "Próximo",
    theme: "Tema",
    language: "Idioma",
    chapter: "Capítulo",
    tocTitle: "Sumário",
    coverPlaceholder: "Adicione sua capa aqui",
    coverInstruction:
      "Substitua este placeholder pela imagem de capa do seu livro",
    settings: "Configurações",
    typography: "Tipografia",
    fontSize: "Tamanho",
    fontFamily: "Fonte",
    fontNormal: "Normal",
    fontLarge: "Grande",
    fontXLarge: "Extra Grande",
    fontSerif: "Serifada",
    fontSans: "Sans",
  },

  // ---- Informações do Livro ----
  book: {
    title: "O Maravilhoso Mágico de Oz",
    author: "L. Frank Baum",
    edition: "1ª Edição • 2026",
  },

  // ---- Capítulos ----
  // Modifique o conteúdo abaixo para adicionar seus próprios capítulos
  // chapters: [
  //   {
  //     number: 1,
  //     title: "O Início da Jornada",
  //     content: [
  //       "Era uma vez, em uma terra distante, onde as montanhas tocavam as nuvens e os rios cantavam melodias antigas, um jovem aventureiro decidiu embarcar em uma jornada extraordinária. Seu nome era Lucas, e ele carregava consigo apenas uma mochila surrada e um coração cheio de esperança.",
  //       "Os moradores da vila o observavam com curiosidade enquanto ele atravessava a praça central. Alguns acenavam em despedida, outros murmuravam preocupações. Mas Lucas mantinha o olhar fixo no horizonte, onde o sol nascente pintava o céu com tons de laranja e rosa.",
  //       "A estrada à sua frente se estendia por quilômetros, serpenteando entre campos verdejantes e florestas misteriosas. Cada passo que dava o aproximava mais do desconhecido, e a cada momento, sua determinação crescia.",
  //       "Esta era apenas o começo de uma aventura que mudaria sua vida para sempre.",
  //     ],
  //   },
  //   {
  //     number: 2,
  //     title: "A Floresta Encantada",
  //     content: [
  //       "Após três dias de caminhada, Lucas chegou à entrada de uma floresta densa e misteriosa. As árvores eram tão altas que seus topos desapareciam na neblina, e um silêncio estranho pairava no ar.",
  //       "Diziam as lendas que esta floresta era habitada por criaturas mágicas, seres que poucos humanos haviam visto e vivido para contar. Lucas engoliu em seco, mas não hesitou. Deu o primeiro passo para dentro da escuridão verde.",
  //       "Logo, percebeu que a floresta não era tão assustadora quanto parecia. Pequenas luzes flutuavam entre as árvores, guiando seu caminho. Eram vaga-lumes, ou talvez algo mais mágico.",
  //       "Foi então que ele ouviu uma voz suave chamando seu nome...",
  //     ],
  //   },
  //   {
  //     number: 3,
  //     title: "O Encontro Inesperado",
  //     content: [
  //       "A voz pertencia a uma criatura que Lucas jamais imaginara encontrar: uma raposa prateada com olhos que brilhavam como estrelas. Ela falava com sabedoria ancestral, conhecendo segredos que o tempo havia esquecido.",
  //       '"Eu estava esperando por você", disse a raposa, sentando-se graciosamente sobre uma pedra coberta de musgo. "Há muito tempo foi profetizado que um viajante de coração puro viria buscar o Artefato Perdido."',
  //       "Lucas escutava em silêncio, absorvendo cada palavra. A raposa explicou que o Artefato tinha o poder de restaurar o equilíbrio do mundo, mas estava escondido em um lugar que apenas os verdadeiramente dignos poderiam alcançar.",
  //       '"Você está disposto a enfrentar os desafios que virão?", perguntou a raposa, seus olhos fixos nos de Lucas.',
  //     ],
  //   },
  //   {
  //     number: 4,
  //     title: "Os Desafios do Caminho",
  //     content: [
  //       "Com a raposa como guia, Lucas enfrentou desafios que testaram não apenas sua força, mas também sua inteligência e compaixão. Cada obstáculo superado revelava uma nova faceta de seu caráter.",
  //       "Primeiro, veio o Rio das Memórias, cujas águas mostravam os arrependimentos mais profundos de quem tentasse atravessá-lo. Lucas viu momentos de seu passado, erros que cometera, mas em vez de se deixar consumir pela culpa, usou essas memórias como lições.",
  //       "Depois, enfrentou o Labirinto das Ilusões, onde nada era o que parecia. Paredes se moviam, caminhos desapareciam, e vozes tentavam confundi-lo. Mas Lucas aprendeu a confiar em seus instintos e seguir seu coração.",
  //       "Finalmente, chegou ao último desafio: a Ponte da Confiança, um abismo sem fundo com uma ponte invisível que só se materializava para aqueles que davam o primeiro passo sem hesitar.",
  //     ],
  //   },
  //   {
  //     number: 5,
  //     title: "O Destino Revelado",
  //     content: [
  //       "Do outro lado da ponte, Lucas encontrou o que procurava. O Artefato Perdido não era um objeto grandioso ou brilhante como ele imaginara. Era um simples cristal, do tamanho de seu punho, que pulsava com uma luz suave e acolhedora.",
  //       "Ao tocá-lo, Lucas compreendeu a verdade: o poder do Artefato não estava nele mesmo, mas na jornada para encontrá-lo. Cada desafio enfrentado, cada lição aprendida, cada ato de coragem e bondade havia transformado não apenas Lucas, mas todo o mundo ao seu redor.",
  //       'A raposa prateada apareceu ao seu lado, sorrindo. "Você entendeu", disse ela. "O verdadeiro poder sempre esteve dentro de você. O Artefato apenas o ajudou a descobri-lo."',
  //       "E assim, Lucas retornou à sua vila, não como o mesmo jovem que partira, mas como alguém que havia descoberto que a maior aventura é a jornada de autoconhecimento, e que cada um de nós carrega dentro de si o poder de mudar o mundo.",
  //     ],
  //   },
  // ],

  chapters: [chapter1PT, chapter2PT, chapter3PT, chapter4PT],
};

// ============================================
// TRADUÇÕES EM INGLÊS
// ============================================

const en: Translation = {
  // ---- Interface Texts ----
  ui: {
    cover: "Cover",
    tableOfContents: "Contents",
    previous: "Previous",
    next: "Next",
    theme: "Theme",
    language: "Language",
    chapter: "Chapter",
    tocTitle: "Table of Contents",
    coverPlaceholder: "Add your cover here",
    coverInstruction: "Replace this placeholder with your book cover image",
    settings: "Settings",
    typography: "Typography",
    fontSize: "Size",
    fontFamily: "Font",
    fontNormal: "Normal",
    fontLarge: "Large",
    fontXLarge: "Extra Large",
    fontSerif: "Serif",
    fontSans: "Inter",
  },

  // ---- Book Information ----
  book: {
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    edition: "1st Edition • 2026",
  },

  // ---- Chapters ----
  // chapters: [
  //   {
  //     number: 1,
  //     title: "The Beginning of the Journey",
  //     content: [
  //       "Once upon a time, in a distant land where mountains touched the clouds and rivers sang ancient melodies, a young adventurer decided to embark on an extraordinary journey. His name was Lucas, and he carried with him only a worn backpack and a heart full of hope.",
  //       "The villagers watched him curiously as he crossed the central square. Some waved goodbye, others murmured concerns. But Lucas kept his gaze fixed on the horizon, where the rising sun painted the sky in shades of orange and pink.",
  //       "The road ahead stretched for miles, winding between verdant fields and mysterious forests. Each step he took brought him closer to the unknown, and with each moment, his determination grew.",
  //       "This was just the beginning of an adventure that would change his life forever.",
  //     ],
  //   },
  //   {
  //     number: 2,
  //     title: "The Enchanted Forest",
  //     content: [
  //       "After three days of walking, Lucas arrived at the entrance of a dense and mysterious forest. The trees were so tall that their tops disappeared into the mist, and a strange silence hung in the air.",
  //       "Legends said this forest was inhabited by magical creatures, beings that few humans had seen and lived to tell about. Lucas swallowed hard but did not hesitate. He took his first step into the green darkness.",
  //       "Soon, he realized the forest was not as frightening as it seemed. Small lights floated among the trees, guiding his path. They were fireflies, or perhaps something more magical.",
  //       "It was then that he heard a soft voice calling his name...",
  //     ],
  //   },
  //   {
  //     number: 3,
  //     title: "The Unexpected Encounter",
  //     content: [
  //       "The voice belonged to a creature Lucas had never imagined meeting: a silver fox with eyes that shone like stars. She spoke with ancient wisdom, knowing secrets that time had forgotten.",
  //       '"I have been waiting for you," said the fox, sitting gracefully on a moss-covered rock. "Long ago it was prophesied that a traveler with a pure heart would come seeking the Lost Artifact."',
  //       "Lucas listened in silence, absorbing every word. The fox explained that the Artifact had the power to restore balance to the world, but it was hidden in a place that only the truly worthy could reach.",
  //       '"Are you willing to face the challenges ahead?", asked the fox, her eyes fixed on Lucas\'s.',
  //     ],
  //   },
  //   {
  //     number: 4,
  //     title: "The Challenges of the Path",
  //     content: [
  //       "With the fox as his guide, Lucas faced challenges that tested not only his strength but also his intelligence and compassion. Each obstacle overcome revealed a new facet of his character.",
  //       "First came the River of Memories, whose waters showed the deepest regrets of anyone who tried to cross it. Lucas saw moments from his past, mistakes he had made, but instead of letting himself be consumed by guilt, he used these memories as lessons.",
  //       "Then he faced the Labyrinth of Illusions, where nothing was what it seemed. Walls moved, paths disappeared, and voices tried to confuse him. But Lucas learned to trust his instincts and follow his heart.",
  //       "Finally, he arrived at the last challenge: the Bridge of Trust, a bottomless abyss with an invisible bridge that only materialized for those who took the first step without hesitation.",
  //     ],
  //   },
  //   {
  //     number: 5,
  //     title: "The Revealed Destiny",
  //     content: [
  //       "On the other side of the bridge, Lucas found what he was looking for. The Lost Artifact was not a grand or bright object as he had imagined. It was a simple crystal, the size of his fist, pulsing with a soft and welcoming light.",
  //       "Upon touching it, Lucas understood the truth: the power of the Artifact was not in itself, but in the journey to find it. Every challenge faced, every lesson learned, every act of courage and kindness had transformed not only Lucas but the entire world around him.",
  //       'The silver fox appeared at his side, smiling. "You understood," she said. "True power has always been within you. The Artifact just helped you discover it."',
  //       "And so, Lucas returned to his village, not as the same young man who had left, but as someone who had discovered that the greatest adventure is the journey of self-discovery, and that each of us carries within ourselves the power to change the world.",
  //     ],
  //   },
  // ],
  chapters: [chapter1EN, chapter2EN, chapter3EN, chapter4EN],
};

// ============================================
// EXPORTAÇÃO
// ============================================

/**
 * Objeto com todas as traduções disponíveis
 * Para adicionar um novo idioma, adicione uma nova chave aqui
 */
export const translations = {
  pt,
  en,
};

/**
 * Função helper para obter tradução pelo idioma
 * @param language - Código do idioma ('pt' ou 'en')
 * @returns Objeto de tradução completo
 */
export const getTranslation = (language: "pt" | "en"): Translation => {
  return translations[language];
};

export default translations;
