"use client";

/**
 * ============================================
 * COMPONENTE DE GUIA DE AJUDA
 * ============================================
 *
 * Modal interativo com tutorial para jovens usuários (10-14 anos).
 * Explica como usar o leitor de ebook com linguagem simples
 * e ícones grandes e coloridos.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useEbookStore } from "@/store/useEbookStore";
import { getTranslation } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ArrowLeftRight,
  List,
  Moon,
  Sun,
  Settings,
  Sparkles,
} from "lucide-react";

// ============================================
// TIPOS
// ============================================

interface HelpGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GuideStep {
  icon: React.ReactNode;
  titleKey: keyof typeof guideTextsPT;
  textKey: keyof typeof guideTextsPT;
  color: string;
}

// ============================================
// TEXTOS DO GUIA (PT)
// ============================================

const guideTextsPT = {
  guideWelcomeTitle: "Bem-vindo ao seu Ebook! 📚",
  guideWelcomeText:
    "Este guia rápido vai te mostrar como usar o leitor. Vamos lá!",
  guideNavigationTitle: "Como Navegar 👆",
  guideNavigationText:
    "Arraste a tela para os lados ou use os botões de anterior ou próximo no rodapé.",
  guideTocTitle: "Sumário 📋",
  guideTocText:
    'Clique em "Sumário" para ver todos os capítulos e ir direto para o que quiser!',
  guideThemeTitle: "Tema Claro ou Escuro 🌙",
  guideThemeText:
    "Prefere ler no escuro? Clique no ícone de lua/sol para mudar o tema!",
  guideSettingsTitle: "Configurações ⚙️",
  guideSettingsText:
    "Mude o idioma, aumente as letras ou troque a fonte na engrenagem!",
  guideReadyTitle: "Tudo Pronto! 🎉",
  guideReadyText: "Agora é só aproveitar a leitura. Divirta-se com a história!",
  guideSkip: "Pular",
  guideNext: "Próximo",
  guidePrevious: "Anterior",
  guideStart: "Começar a Ler!",
  guideTitle: "Como Usar",
};

// ============================================
// TEXTOS DO GUIA (EN)
// ============================================

const guideTextsEN = {
  guideWelcomeTitle: "Welcome to your Ebook! 📚",
  guideWelcomeText:
    "This quick guide will show you how to use the reader. Let's go!",
  guideNavigationTitle: "How to Navigate 👆",
  guideNavigationText:
    "Swipe the screen left or right, or use the buttons previous or next at the bottom.",
  guideTocTitle: "Table of Contents 📋",
  guideTocText:
    'Click "Contents" to see all chapters and jump to any one you want!',
  guideThemeTitle: "Light or Dark Theme 🌙",
  guideThemeText:
    "Prefer reading in the dark? Click the moon/sun icon to change the theme!",
  guideSettingsTitle: "Settings ⚙️",
  guideSettingsText:
    "Change language, make text bigger, or switch fonts in the gear icon!",
  guideReadyTitle: "All Set! 🎉",
  guideReadyText: "Now just enjoy reading. Have fun with the story!",
  guideSkip: "Skip",
  guideNext: "Next",
  guidePrevious: "Back",
  guideStart: "Start Reading!",
  guideTitle: "How to Use",
};

// ============================================
// PASSOS DO GUIA
// ============================================

const guideSteps: GuideStep[] = [
  {
    icon: <BookOpen className="w-16 h-16" />,
    titleKey: "guideWelcomeTitle",
    textKey: "guideWelcomeText",
    color: "text-primary",
  },
  {
    icon: <ArrowLeftRight className="w-16 h-16" />,
    titleKey: "guideNavigationTitle",
    textKey: "guideNavigationText",
    color: "text-blue-500",
  },
  {
    icon: <List className="w-16 h-16" />,
    titleKey: "guideTocTitle",
    textKey: "guideTocText",
    color: "text-green-500",
  },
  {
    icon: <Moon className="w-16 h-16" />,
    titleKey: "guideThemeTitle",
    textKey: "guideThemeText",
    color: "text-purple-500",
  },
  {
    icon: <Settings className="w-16 h-16" />,
    titleKey: "guideSettingsTitle",
    textKey: "guideSettingsText",
    color: "text-orange-500",
  },
  {
    icon: <Sparkles className="w-16 h-16" />,
    titleKey: "guideReadyTitle",
    textKey: "guideReadyText",
    color: "text-yellow-500",
  },
];

// ============================================
// COMPONENTE
// ============================================

const HelpGuide = ({ open, onOpenChange }: HelpGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const language = useEbookStore((state) => state.language);

  // Seleciona os textos do guia pelo idioma
  const guideTexts = language === "pt" ? guideTextsPT : guideTextsEN;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === guideSteps.length - 1;
  const step = guideSteps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onOpenChange(false);
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {guideTexts.guideTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Conteúdo do passo atual */}
        <div className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Ícone grande e colorido */}
              <div className={`${step.color} p-4 rounded-full bg-muted/50`}>
                {step.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold">{guideTexts[step.titleKey]}</h3>

              {/* Descrição */}
              <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
                {guideTexts[step.textKey]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores de progresso (dots) */}
        <div className="flex justify-center gap-2 py-2">
          {guideSteps.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-200
                ${
                  index === currentStep
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }
              `}
              aria-label={`Ir para passo ${index + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between items-center pt-4">
          {/* Botão Pular / Anterior */}
          {isFirstStep ? (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              {guideTexts.guideSkip}
            </Button>
          ) : (
            <Button variant="ghost" onClick={handlePrevious}>
              {guideTexts.guidePrevious}
            </Button>
          )}

          {/* Botão Próximo / Começar */}
          <Button onClick={handleNext} className="min-w-[140px]">
            {isLastStep ? guideTexts.guideStart : guideTexts.guideNext}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuide;
