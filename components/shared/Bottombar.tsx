"use client";
import { bottombarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Bottombar() {
  const pathname = usePathname();
  return (
    <section className="bottom-bar fixed bottom-0 w-full">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            href={link.route}
            key={link.route}
            className={`${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              height={16}
              width={16}
              className={`${isActive && "invert-white"}`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
}

// CSS
// .bottom-bar {
//   @apply z-50 flex-between fixed bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden;
// }
