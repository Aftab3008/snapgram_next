"use client";

import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const Params = useParams();
  const ProfileId = Params.profileId as Id<"users">;
  const pathname = usePathname();
  const user = useQuery(api.users.getCurrentUser);
  const currentUser = useQuery(api.users.getUserById, { profileId: ProfileId });
  const posts = useQuery(api.posts.getPostsByUser, { userId: ProfileId });
  const toggelFollow = useMutation(api.users.toggleFollow);

  const handleFollow = async () => {
    if (user && currentUser && user._id === currentUser._id) {
      return;
    }
    const { message } = await toggelFollow({ followId: ProfileId });
    toast.success(message);
  };

  if (!currentUser || !user || !posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={posts.length} label="Posts" />
              <StatBlock
                value={currentUser.followers.length}
                label="Followers"
              />
              <StatBlock
                value={currentUser.following.length}
                label="Following"
              />
            </div>

            {currentUser.bio && (
              <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                {currentUser.bio}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user._id !== currentUser._id && "hidden"}`}>
              <Link
                href={`/update-profile/${currentUser._id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-xl ${
                  user._id !== currentUser._id && "hidden"
                }`}
              >
                <Image
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user._id === currentUser._id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8 rounded-xl"
                onClick={handleFollow}
              >
                {currentUser.followers.includes(user._id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser._id === user._id && (
        <div className="flex max-w-5xl w-full gap-2">
          <Link
            href={`/profile/${ProfileId}`}
            className={`profile-tab rounded-xl ${
              pathname === `/profile/${ProfileId}` && "!bg-dark-3"
            }`}
          >
            <Image
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            href={`/profile/${ProfileId}/liked-posts`}
            className={`profile-tab rounded-xl ${
              pathname === `/profile/${ProfileId}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <Image
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}
      <GridPostList posts={posts} showUser={false} />
    </div>
  );
};

export default Profile;
