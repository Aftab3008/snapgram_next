import { Button } from "../ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Topbar() {
  const user = await currentUser();

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={325}
            width={130}
          />
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost">
            <SignOutButton redirectUrl="/sign-in">
              <img src="/assets/icons/logout.svg" alt="logout" />
            </SignOutButton>
          </Button>

          <Link href={`/profile/${user?.id}`} className="flex-center gap-3">
            <img
              src={user?.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile"
              className="rounded-full h-8 w-8"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
