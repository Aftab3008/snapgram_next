"use client";

import PostCard from "@/components/shared/PostCard";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";

export default function Home() {
  const posts = useQuery(api.posts.getAllPosts, {});
  const user = useQuery(api.users.getCurrentUser, {});
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {!user && !posts ? (
            <Loader className="w-8 h-8 animate-spin" color="white" />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {user &&
                posts &&
                posts?.map((post: Doc<"posts">) => (
                  <PostCard post={post} key={post._id} user={user} />
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
