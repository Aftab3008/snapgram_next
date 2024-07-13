import Image from "next/image";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 h-screen w-full">
      <Image
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-full object-cover bg-no-repeat"
        height={100}
        width={100}
      />
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        {children}
      </section>
    </div>
  );
}
