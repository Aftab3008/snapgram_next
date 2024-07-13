"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function Topbar() {
  const user = {
    email: "itsbloodyfang987@gmail.com",
    id: "2",
    imageUrl: "/assets/images/profile.png",
  };

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
          <SignOutButton>
            <Button variant="ghost" className="shad-button_ghost">
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
          </SignOutButton>
          {!user.email ? (
            <Loader className="h-8 w-8" />
          ) : (
            <Link href={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.imageUrl || "/assets/images/profile.png"}
                alt="profile"
                className="rounded-full h-8 w-8"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
