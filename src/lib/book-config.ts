/**
 * ============================================
 * CONFIGURAÇÕES DO LIVRO
 * ============================================
 *
 * Este arquivo contém todas as configurações visuais e de comportamento
 * do leitor de ebook. Modifique os valores abaixo para personalizar
 * a aparência do seu livro.
 *
 * SEÇÕES:
 * 1. Metadados do Livro (título, autor, etc.)
 * 2. Configurações de Animação
 * 3. Configurações de Layout
 * 4. Configurações de Gestos
 */

// ============================================
// 1. METADADOS DO LIVRO
// ============================================
// Modifique aqui as informações básicas do seu livro

export const bookMetadata = {
  /** Título do livro em cada idioma */
  title: {
    pt: "Meu Livro Incrível",
    en: "My Amazing Book",
  },

  /** Nome do autor */
  author: {
    pt: "Nome do Autor",
    en: "Author Name",
  },

  /** Ano de publicação */
  year: 2024,

  /** Edição do livro */
  edition: {
    pt: "1ª Edição",
    en: "1st Edition",
  },
};

// ============================================
// 2. CONFIGURAÇÕES DE ANIMAÇÃO
// ============================================
// Ajuste a velocidade e o tipo das animações

export const animationConfig = {
  /**
   * Duração das transições de página em milissegundos
   * Valores menores = transições mais rápidas
   * Recomendado: 200-400ms
   */
  pageTransitionDuration: 300,

  /**
   * Tipo de easing para as animações
   * Opções comuns: 'ease-out', 'ease-in-out', 'cubic-bezier(...)'
   */
  pageTransitionEasing: "ease-out",

  /**
   * Distância do slide em pixels durante a transição
   * Valores maiores = movimento mais perceptível
   */
  slideDistance: 50,
};

// ============================================
// 3. CONFIGURAÇÕES DE LAYOUT
// ============================================
// Personalize o espaçamento e dimensões

export const layoutConfig = {
  /**
   * Largura máxima do conteúdo em pixels
   * Recomendado para leitura: 600-800px
   */
  maxContentWidth: 720,

  /**
   * Padding horizontal do conteúdo
   * Classe Tailwind ou valor em rem/px
   */
  contentPaddingX: "1.5rem",

  /**
   * Padding vertical do conteúdo
   * Classe Tailwind ou valor em rem/px
   */
  contentPaddingY: "2rem",

  /**
   * Altura da navbar em pixels
   */
  navbarHeight: 56,

  /**
   * Altura dos botões de navegação inferior em pixels
   */
  navigationButtonsHeight: 64,
};

// ============================================
// 4. CONFIGURAÇÕES DE GESTOS
// ============================================
// Configure o comportamento do swipe/drag

export const gestureConfig = {
  /**
   * Distância mínima em pixels para ativar a navegação por swipe
   * Valores menores = mais sensível
   */
  swipeThreshold: 50,

  /**
   * Velocidade mínima do swipe para ativar a navegação
   * Valores menores = mais sensível
   */
  swipeVelocity: 0.3,

  /**
   * Se true, permite navegar arrastando horizontalmente
   */
  enableDrag: true,

  /**
   * Se true, previne conflito com scroll vertical
   * Recomendado: true
   */
  preventVerticalConflict: true,
};

// ============================================
// 5. CONFIGURAÇÕES TIPOGRÁFICAS
// ============================================
// Classes Tailwind para tipografia (modifique conforme necessário)

export const typographyConfig = {
  /**
   * Classe da fonte para títulos
   * Use 'font-serif' para fontes serifadas ou 'font-sans' para sans-serif
   */
  headingFont: "font-serif-display",

  /**
   * Classe da fonte para corpo do texto
   */
  bodyFont: "font-serif",

  /**
   * Classe da fonte para interface (botões, labels)
   */
  uiFont: "font-sans",

  /**
   * Tamanho base do texto do conteúdo
   */
  bodySize: "text-lg",

  /**
   * Altura da linha para o conteúdo
   */
  bodyLineHeight: "leading-relaxed",
};

// ============================================
// EXPORTAÇÃO UNIFICADA
// ============================================

export const bookConfig = {
  metadata: bookMetadata,
  animation: animationConfig,
  layout: layoutConfig,
  gesture: gestureConfig,
  typography: typographyConfig,
};

export default bookConfig;
