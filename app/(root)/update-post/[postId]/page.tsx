"use client";

import PostForm from "@/components/shared/PostForm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function page() {
  const Params = useParams();
  const postId = Params.postId as Id<"posts">;
  const user = useQuery(api.users.getCurrentUser);
  const post = useQuery(api.posts.getPostById, {
    postId: postId,
  });
  if (!post || !user) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <Image
            src="/assets/icons/add-post.svg"
            alt="add"
            height={36}
            width={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        {post.authorId !== user._id ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-2xl text-rose-500">
              You are not authorized to change this post
            </h1>
          </div>
        ) : (
          <PostForm post={post} action="update" />
        )}
      </div>
    </div>
  );
}
