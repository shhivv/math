import { Mafs } from "mafs";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  math: React.ReactNode;
}

export default function Layout({ children, math }: ILayout) {
  return (
    <>
      <main className="bg-[#181818] flex w-screen h-screen items-center flex-col">
        <div className="w-[95%] h-max mt-4 mb-6 rounded-xl overflow-hidden border border-neutral-500 drop-shadow-xl">
          <Mafs>{math}</Mafs>
        </div>
        <div className="text-neutral-300 font-sans w-[95%] rounded-lg">
          {children}
        </div>
      </main>
    </>
  );
}
