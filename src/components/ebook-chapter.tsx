"use client";

import { BookText } from "./book-text";
import { Card } from "./ui/card";

export const EbookChapter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="max-w-3xl mx-auto border rounded-none h-full">
      <BookText>{children}</BookText>
    </Card>
  );
};
