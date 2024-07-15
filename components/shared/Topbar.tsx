"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Topbar() {
  const user = useQuery(api.users.getCurrentUser);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            height={325}
            width={130}
          />
        </Link>
        <div className="flex gap-4">
          <SignOutButton redirectUrl="/sign-in">
            <Button variant="ghost" className="shad-button_ghost">
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
          </SignOutButton>
          {!user ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Link href={`/profile/${user._id}`} className="flex-center gap-3">
              <Image
                src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="rounded-full min-w-[32px] min-h-[32px]"
                width={32}
                height={32}
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
