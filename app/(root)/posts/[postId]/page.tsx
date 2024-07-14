"use client";

import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatRelativeDate } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PostDetails() {
  const Params = useParams();
  const router = useRouter();
  const postId = Params.postId as Id<"posts">;
  const user = useQuery(api.users.getCurrentUser);
  const post = useQuery(api.posts.getPostById, { postId: postId });
  const deletePost = useMutation(api.posts.deletePost);

  const handleDeletePost = async () => {
    const deletedPost = await deletePost({ postId: postId });
    if (deletedPost) {
      toast.success("Post deleted successfully");
      router.push("/");
    }
  };

  return (
    <div className="post_details-container">
      {!user && !post ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                href={`/profile/${post?.authorId}`}
                className="flex items-center gap-3"
              >
                <Image
                  src={
                    post?.authorImage || "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                  width={48}
                  height={48}
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.authorName}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatRelativeDate(post?._creationTime)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link
                  href={`/update-post/${post?._id}`}
                  className={`${user?._id !== post?.authorId && "hidden"}`}
                >
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    height={24}
                    width={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user?._id !== post?.authorId && "hidden"}`}
                >
                  <Image
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    height={24}
                    width={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              {post && user && <PostStats post={post} userId={user._id} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
