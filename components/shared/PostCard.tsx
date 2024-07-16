import { formatRelativeDate } from "@/lib/utils";
// import PostStats from "./PostStats";
import Link from "next/link";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import PostStats from "./PostStats";
import { Avatar, AvatarImage } from "../ui/avatar";

type PostCardProps = {
  post: Doc<"posts">;
  user: Doc<"users">;
};

export default function PostCard({ post, user }: PostCardProps) {
  if (!post.authorId) {
    return;
  }
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.authorId}`}>
            {/* <img
              src={post.authorImage || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            /> */}
            <Avatar className="w-12 h-12 lg:h-12">
              <AvatarImage
                src={
                  post.authorImage || "/assets/icons/profile-placeholder.svg"
                }
              />
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.authorName}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatRelativeDate(post._creationTime)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          href={`/update-post/${post._id}`}
          className={`${user._id !== post.authorId && "hidden"}`}
        >
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            height={20}
            width={20}
          />
        </Link>
      </div>
      <Link href={`/posts/${post._id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <PostStats post={post} userId={user._id} />
    </div>
  );
}
