import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

type UserCardProps = {
  user: Doc<"users">;
  currentUser: Doc<"users">;
};

const UserCard = ({ user, currentUser }: UserCardProps) => {
  return (
    <Link href={`/profile/${user._id}`} className="user-card">
      <Image
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full min-w-[56px] min-h-[56px]"
        width={56}
        height={56}
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className={`text-light-1 flex gap-2 px-5 rounded-xl ${currentUser.following.includes(user._id) ? "bg-dark-4 hover:bg-dark-4" : "bg-primary-500 hover:bg-primary-500"}`}
      >
        {currentUser.following.includes(user._id) ? "Unfollow" : "Follow"}
      </Button>
    </Link>
  );
};

export default UserCard;
