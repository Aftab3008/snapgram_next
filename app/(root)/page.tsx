"use client";

import PostCard from "@/components/shared/PostCard";
import { PostSkeleton } from "@/components/shared/PostSkeleton";
import UserCard from "@/components/shared/UserCard";
import { UserSkeleton } from "@/components/shared/UserSkeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { usePaginatedQuery, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView();
  const {
    results: posts,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(api.posts.paginatePosts, {}, { initialNumItems: 5 });
  const user = useQuery(api.users.getCurrentUser);
  const usersYouMayKnow = useQuery(api.users.getUsersYouMayKnow);

  useEffect(() => {
    if (inView && status === "CanLoadMore") {
      loadMore(5);
    }
  }, [inView, status]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {!user && isLoading && !usersYouMayKnow ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : !isLoading && posts && posts.length == 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-2xl">No posts yet! create one</h1>
            </div>
          ) : (
            <>
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {user &&
                  posts?.map((post: Doc<"posts">) => (
                    <PostCard post={post} key={post._id} user={user} />
                  ))}
              </ul>
              {status === "CanLoadMore" && (
                <Loader className="w-6 h-6 animate-spin mt-2" />
              )}
              <div ref={ref} className="mt-2" />
            </>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        <p className="text-light-2">You may know</p>
        {usersYouMayKnow && user ? (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {usersYouMayKnow.map((creator) => (
              <li key={creator._id}>
                <UserCard user={creator} currentUser={user} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid 2xl:grid-cols-2 gap-6">
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
