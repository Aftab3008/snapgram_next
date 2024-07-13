"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";

export default function LeftSidebar() {
  const pathname = usePathname();
  const user = {
    email: "itsbloodyfang987@gmail.com",
    id: "2",
    imageUrl: "/assets/images/profile.png",
    name: "Bloody Fang",
    username: "bloodyfang",
  };
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={36}
            width={170}
          />
        </Link>

        {!user.email ? (
          <div className="h-14">
            <Loader className="h-8 w-8 " />
          </div>
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className="flex gap-3 items-center"
          >
            <img
              src={user.imageUrl || "/assets/images/profile.png"}
              alt="profile"
              className="rounded-full h-14 w-14"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.route}
                className={cn("leftsidebar-link group rounded-xl", {
                  "bg-primary-500": isActive,
                })}
              >
                <Link
                  href={link.route}
                  className="flex gap-4 items-center p-4 rounded-full"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={cn("group-hover:invert-white", {
                      "invert-white": isActive,
                    })}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <SignOutButton>
        <Button variant="ghost" className="shad-button_ghost">
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </SignOutButton>
    </nav>
  );
}
