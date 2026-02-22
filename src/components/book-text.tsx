"use client";
import type React from "react";
import { useRef } from "react";

export const BookText = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    const target = e.currentTarget;
    const isScrollable = target.scrollHeight > target.clientHeight;

    if (isScrollable) {
      // Verifica se está no início ou fim do scroll
      const isAtTop = target.scrollTop === 0;
      const isAtBottom =
        target.scrollTop + target.clientHeight >= target.scrollHeight;

      // Só permite scroll se não estiver nos limites ou se estiver scrollando na direção permitida
      if ((!isAtTop || e.deltaY > 0) && (!isAtBottom || e.deltaY < 0)) {
        e.stopPropagation();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.currentTarget;
    const isScrollable = target.scrollHeight > target.clientHeight;
    if (isScrollable) {
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={contentRef}
      className="flex-1 flex min-h-[600px] max-h-[600px] flex-col justify-between p-8 md:p-12 overflow-y-auto hide-scrollbar touch-pan-y"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};
