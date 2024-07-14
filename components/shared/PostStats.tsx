import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Image from "next/image";

type PostStatsProps = {
  post: Doc<"posts">;
  userId: Id<"users">;
};

export default function PostStats({ post, userId }: PostStatsProps) {
  const isSavedPost = post.saved.includes(userId);
  const isLikedPost = post.liked.includes(userId);
  const toggleSavePost = useMutation(api.posts.toggleSavePost);
  const toggleLikePost = useMutation(api.posts.toggleLikePost);

  const handleSavePost = () => {
    toggleSavePost({ postId: post._id, userId });
  };

  const handleToggleLike = () => {
    toggleLikePost({ postId: post._id, userId });
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            isLikedPost ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleToggleLike}
        />
        <p className="small-medium lg:base-medium">{post.liked.length}</p>
      </div>
      <div className="flex gap-2">
        <Image
          src={
            isSavedPost ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
          }
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
}
