"use client";

import { Navbar } from "./navbar";

export const LayoutBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full lg:p-2.25 flex flex-col relative rounded-b-lg">
      {/* <Navbar /> */}
      <div className="w-full relative flex flex-col grow">{children}</div>
    </div>
  );
};
