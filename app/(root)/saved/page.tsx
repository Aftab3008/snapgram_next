"use client";

import GridPostList from "@/components/shared/GridPostList";
import { SavedSkeleton } from "@/components/shared/SavedSkeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";

const Saved = () => {
  const savePosts = useQuery(api.posts.getUserSavedPosts);
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <Image
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!savePosts ? (
        <div>
          <SavedSkeleton />
        </div>
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts && savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
