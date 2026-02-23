/**
 * ============================================
 * COMPONENTE DE NAVBAR
 * ============================================
 *
 * Barra de navegação fixa com drawer de sumário,
 * toggle de tema e drawer de configurações.
 */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */

import { useState } from "react";
import {
  useEbookStore,
  type Language,
  type FontSize,
  type FontFamily,
} from "@/store/useEbookStore";
import { getTranslation } from "@/lib/translations";
import { bookConfig } from "@/lib/book-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  List,
  Moon,
  Sun,
  ChevronRight,
  Settings,
  Type,
  HelpCircle,
} from "lucide-react";
import HelpGuide from "./help-guide";
import { useTheme } from "next-themes";
import { Logo } from "../logo";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // ---- Estado Local ----
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // ---- Estado Global ----
  const currentPage = useEbookStore((state) => state.currentPage);
  const language = useEbookStore((state) => state.language);
  // const theme = useEbookStore((state) => state.theme);
  const fontSize = useEbookStore((state) => state.fontSize);
  const fontFamily = useEbookStore((state) => state.fontFamily);
  const setLanguage = useEbookStore((state) => state.setLanguage);
  // const toggleTheme = useEbookStore((state) => state.toggleTheme);
  const setFontSize = useEbookStore((state) => state.setFontSize);
  const setFontFamily = useEbookStore((state) => state.setFontFamily);
  const goToCover = useEbookStore((state) => state.goToCover);
  const goToChapter = useEbookStore((state) => state.goToChapter);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // ---- Tradução e Configuração ----
  const t = getTranslation(language);
  const { layout, typography } = bookConfig;

  // ---- Idiomas Disponíveis ----
  const availableLanguages: { code: Language; label: string; flag: string }[] =
    [
      { code: "pt", label: "Português", flag: "🇧🇷" },
      { code: "en", label: "English", flag: "🇺🇸" },
    ];

  // ---- Handler para navegação via drawer ----
  const handleChapterClick = (index: number) => {
    goToChapter(index);
    setIsDrawerOpen(false);
  };

  return (
    <TooltipProvider>
      {/* className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-2 sm:px-4
          bg-background/80 backdrop-blur-md
          border-b border-border
          background-header
        " */}
      <header
        className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-2 sm:px-4
          bg-[#fff9ea] dark:bg-[#252525]
          border-b border-[#252525] dark:border-[#eaeaea]
          
        "
        style={{ height: `${layout.navbarHeight}px` }}
      >
        {/* ================================================
            LADO ESQUERDO - Navegação Principal
            ================================================ */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Logo width={48} height={48} className="mr-4" />
          {/* Botão Capa */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentPage === 0 ? "secondary" : "ghost"}
                size="sm"
                onClick={goToCover}
                className={`${typography.uiFont} rounded gap-1 sm:gap-2 px-2 sm:px-3 hover:bg-[#252525] hover:text-[#eaeaea] hover:dark:bg-[#eaeaea] hover:dark:text-[#252525] cursor-pointer`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t.ui.cover}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.ui.cover}</p>
            </TooltipContent>
          </Tooltip>

          {/* Botão Sumário com Drawer */}
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    variant={currentPage === 1 ? "secondary" : "ghost"}
                    size="sm"
                    className={`${typography.uiFont} rounded gap-1 sm:gap-2 px-2 sm:px-3 hover:bg-[#252525] hover:text-[#eaeaea] hover:dark:bg-[#eaeaea] hover:dark:text-[#252525] cursor-pointer`}
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {t.ui.tableOfContents}
                    </span>
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.ui.tableOfContents}</p>
              </TooltipContent>
            </Tooltip>

            {/* ================================================
                DRAWER DE SUMÁRIO
                ================================================ */}
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
              <SheetHeader className="mb-6 p-0">
                <SheetTitle className={`${typography.headingFont} text-xl`}>
                  {t.ui.tocTitle}
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1">
                {t.chapters.map((chapter, index) => (
                  <button
                    type="button"
                    key={chapter.number}
                    onClick={() => handleChapterClick(index)}
                    className={`
                      group
                      flex items-center justify-between
                      w-full px-3 py-3
                      rounded
                      text-left
                      transition-colors duration-200
                      cursor-pointer
                      ${
                        currentPage === index + 2
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          ${typography.uiFont}
                          text-xs 
                          text-muted-foreground
                          font-medium
                          min-w-10
                        `}
                      >
                        {t.ui.chapter.slice(0, 3)} {chapter.number}
                      </span>
                      <span
                        className={`
                          ${typography.headingFont}
                          text-sm
                          ${
                            currentPage === index + 2
                              ? "text-primary"
                              : "text-foreground"
                          }
                        `}
                      >
                        {chapter.subtitle}
                      </span>
                    </div>
                    <ChevronRight
                      className={`
                        w-4 h-4 
                        text-muted-foreground
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                      `}
                    />
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* ================================================
            CENTRO - Vazio (removida porcentagem)
            ================================================ */}
        {/* ================================================
            LADO DIREITO - Ajuda, Tema e Configurações
            ================================================ */}
        <div className="flex justify-end items-center gap-0.5 sm:gap-1">
          {/* Botão de Ajuda */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGuide(true)}
                className="rounded gap-1 sm:gap-2 px-2 sm:px-3 hover:bg-[#252525] hover:text-[#eaeaea] hover:dark:bg-[#eaeaea] hover:dark:text-[#252525] cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language === "pt" ? "Ajuda" : "Help"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Toggle de Tema */}
          <Tooltip>
            <TooltipTrigger asChild>
              <AnimatedThemeToggler />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.ui.theme}</p>
            </TooltipContent>
          </Tooltip>

          {/* Botão de Configurações com Drawer */}
          <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded gap-1 sm:gap-2 px-2 sm:px-3 hover:bg-[#252525] hover:text-[#eaeaea] hover:dark:bg-[#eaeaea] hover:dark:text-[#252525] cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.ui.settings}</p>
              </TooltipContent>
            </Tooltip>

            {/* ================================================
                DRAWER DE CONFIGURAÇÕES
                ================================================ */}
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-5">
              <SheetHeader className="mb-6 p-0">
                <SheetTitle className={`${typography.headingFont} text-xl`}>
                  {t.ui.settings}
                </SheetTitle>
              </SheetHeader>

              {/* Seção de Idioma */}
              <div className="space-y-3">
                <h3
                  className={`${typography.uiFont} text-sm font-medium text-muted-foreground`}
                >
                  {t.ui.language}
                </h3>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue>
                      <span className="flex items-center gap-3">
                        {/* <span className="text-xl">
                          {
                            availableLanguages.find((l) => l.code === language)
                              ?.flag
                          }
                        </span> */}
                        <span className={typography.uiFont}>
                          {
                            availableLanguages.find((l) => l.code === language)
                              ?.label
                          }
                        </span>
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-3">
                          {/* <span className="">{lang.flag}</span> */}
                          <span>{lang.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seção de Tipografia */}
              <div className="space-y-4 mt-6 pt-6 border-t border-border">
                <h3
                  className={`${typography.uiFont} text-sm font-medium text-muted-foreground flex items-center gap-2`}
                >
                  <Type className="w-4 h-4" />
                  {t.ui.typography}
                </h3>

                {/* Tamanho da Fonte */}
                <div className="space-y-2">
                  {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="text-xs text-muted-foreground">
                    {t.ui.fontSize}
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={fontSize === "normal" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setFontSize("normal")}
                      className="flex-1 text-sm"
                    >
                      A
                    </Button>
                    <Button
                      variant={fontSize === "large" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setFontSize("large")}
                      className="flex-1 text-base"
                    >
                      A
                    </Button>
                    <Button
                      variant={fontSize === "xlarge" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setFontSize("xlarge")}
                      className="flex-1 text-lg"
                    >
                      A
                    </Button>
                  </div>
                </div>

                {/* Família da Fonte */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">
                    {t.ui.fontFamily}
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={fontFamily === "serif" ? "secondary" : "outline"}
                      onClick={() => setFontFamily("serif")}
                      className="flex-1 font-serif"
                    >
                      <span className="mr-2">Aa</span>
                      {t.ui.fontSerif}
                    </Button>
                    <Button
                      variant={fontFamily === "sans" ? "secondary" : "outline"}
                      onClick={() => setFontFamily("sans")}
                      className="flex-1 font-sans"
                    >
                      <span className="mr-2">Aa</span>
                      {t.ui.fontSans}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Modal do Guia de Ajuda */}
        <HelpGuide open={showGuide} onOpenChange={setShowGuide} />
      </header>
    </TooltipProvider>
  );
};

export default Navbar;
