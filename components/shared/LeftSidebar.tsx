"use client";

import { sidebarLinks } from "@/constants";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { INavLink } from "@/types";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import ProfileSkeleton from "./ProfileSkeleton";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function LeftSidebar() {
  const pathname = usePathname();
  const user = useQuery(api.users.getCurrentUser);

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

        {!user ? (
          <div className="flex justify-center items-center">
            <ProfileSkeleton position="bottom" height={14} width={14} />
          </div>
        ) : (
          <Link
            href={`/profile/${user._id}`}
            className="flex gap-3 items-center"
          >
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              />
            </Avatar>
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
      <SignOutButton redirectUrl="/sign-in">
        <Button variant="ghost" className="shad-button_ghost">
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </SignOutButton>
    </nav>
  );
}
