"use client";

import { cn } from "@/lib/utils";

export const BookChapter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border border-[#252525] dark:border-[#eaeaea] h-[calc(100vh-140px)] max-h-[calc(100vh-140px)] py-12 px-16 overflow-y-auto hide-scrollbar background-texture",
        className
      )}
    >
      {children}
    </div>
  );
};
