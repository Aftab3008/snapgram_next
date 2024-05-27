"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="leftsidebar h-full md:h-screen">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={36}
            width={170}
          />
        </Link>

        <Link href={`/profile/${user?.id}`} className="flex gap-3 items-center">
          <img
            src={user?.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="rounded-full h-14 w-14"
          />
          <div className="flex flex-col">
            <p className="body-bold">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.route}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <Link href={link.route} className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant="ghost" className="shad-button_ghost">
        <SignOutButton redirectUrl="/sign-in">
          <>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </>
        </SignOutButton>
      </Button>
    </nav>
  );
}

// // CSS
// .leftsidebar {
//   @apply hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2 ;
// }
