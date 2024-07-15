"use client";

import EditProfileCard from "@/components/shared/EditProfileCard";
import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
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
  const user = useQuery(api.users.getCurrentUser);
  const currentUser = useQuery(api.users.getUserById, { profileId: ProfileId });
  const posts = useQuery(api.posts.getPostsByUser, { userId: ProfileId });
  const postsLiked = useQuery(api.posts.userLikedPosts, { userId: ProfileId });
  const toggelFollow = useMutation(api.users.toggleFollow);
  const [isOpen, setIsOpen] = useState(false);

  const handleFollow = async () => {
    if (user && currentUser && user._id === currentUser._id) {
      return;
    }
    const { message } = await toggelFollow({ followId: ProfileId });
    toast.success(message);
  };

  if (!currentUser || !user || !posts || !postsLiked)
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
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger
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
                </DialogTrigger>
                <DialogContent className="bg-dark-1 w-full dialog-content rounded-2xl border-primary-500">
                  <DialogTitle className="flex gap-4 mt-2">
                    <Image
                      src="/assets/icons/edit.svg"
                      width={36}
                      height={36}
                      alt="edit"
                      className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                      Edit Profile
                    </h2>
                  </DialogTitle>
                  <EditProfileCard
                    user={user}
                    currentUserId={currentUser._id}
                    setIsOpen={setIsOpen}
                  />
                </DialogContent>
              </Dialog>
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

      <Tabs defaultValue="posts" className="flex flex-col">
        <TabsList className="flex md:justify-start justify-center items-center h-fit w-full max-w-5xl mb-5">
          <div className="flex gap-2">
            <TabsTrigger
              value="posts"
              className={`profile-tab  w-full rounded-xl data-[state=active]:!bg-dark-3 data-[state=inactive]:bg-black`}
            >
              <Image
                src={"/assets/icons/posts.svg"}
                alt="posts"
                width={20}
                height={20}
              />
              Posts
            </TabsTrigger>
            {currentUser._id === user._id && (
              <TabsTrigger
                value="likedPosts"
                className={`profile-tab w-full rounded-xl data-[state=active]:!bg-dark-3 data-[state=inactive]:bg-black`}
              >
                <Image
                  src={"/assets/icons/like.svg"}
                  alt="like"
                  width={20}
                  height={20}
                />
                Liked Posts
              </TabsTrigger>
            )}
          </div>
        </TabsList>
        <TabsContent value="posts">
          {posts.length == 0 ? (
            <div className="flex gap-4 flex-col items-center justify-center">
              <h1 className="text-xl mt-10">No posts!</h1>
              <Link
                href="/create-post"
                className="mt-10 bg-dark-4 p-4 rounded-xl"
              >
                Create one
              </Link>
            </div>
          ) : (
            <GridPostList posts={posts} showUser={false} />
          )}
        </TabsContent>
        {currentUser._id === user._id && (
          <TabsContent value="likedPosts">
            {postsLiked.length == 0 ? (
              <div className="flex gap-4 flex-col items-center justify-center">
                <h1 className="text-xl mt-10">No posts liked !</h1>
                <Link href="/" className="mt-10 bg-dark-4 p-4 rounded-xl">
                  View Posts
                </Link>
              </div>
            ) : (
              <GridPostList posts={postsLiked} showStats={false} />
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
