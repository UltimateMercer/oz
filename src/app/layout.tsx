import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Crimson_Pro, Lexend } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { LayoutBase } from "@/components/layout-base";
import { Html } from "@/components/html";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lexend = Lexend({
  variable: "--font-lexend",
  // weight: ["300"],
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wonderful Wizard of Oz - E-book",
  description: "Por L. Frank Baum - E-book por Ultimate Mercer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Html>
      <body
        className={`${inter.variable} ${lexend.variable} ${dmSerifDisplay.variable} ${crimsonPro.variable}  bg-[#fbf0d9] dark:bg-[#252525] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </Html>
  );
}
