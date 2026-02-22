"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export const Navbar = () => {
  return (
    <nav className="background-header rounded-b-[2px] px-4">
      <div className="">{/* imagem */}</div>
      <div className="flex"></div>
      <div className="flex justify-end">
        <AnimatedThemeToggler />
      </div>
    </nav>
  );
};
