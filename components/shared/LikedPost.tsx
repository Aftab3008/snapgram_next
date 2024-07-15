import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import GridPostList from "./GridPostList";

export default function LikedPost({ userId }: { userId: Id<"users"> }) {
  const postsLiked = useQuery(api.posts.userLikedPosts, { userId });

  return (
    <>{postsLiked && <GridPostList posts={postsLiked} showStats={false} />}</>
  );
}
