import Image from "next/image";
import { BookChapter } from "@/components/book-chapter";
import { BookCover } from "@/components/book-cover";
import { BackgroundImageTexture } from "@/components/ui/bg-image-texture";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookText } from "@/components/book-text";
import { EbookChapter } from "@/components/ebook-chapter";
import EbookReader from "@/components/ebook/ebook-reader";

export default function Home() {
  return <EbookReader />;
}
