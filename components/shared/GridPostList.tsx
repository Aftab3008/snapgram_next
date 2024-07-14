import { Doc, Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import PostStats from "./PostStats";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type GridPostListProps = {
  posts: Doc<"posts">[];
  showUser?: boolean;
  showStats?: boolean;
};
export default function GridPostList({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) {
  const user = useQuery(api.users.getCurrentUser);
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post._id} className="relative min-w-80 h-80">
          <Link href={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <Image
                  src={post.authorImage}
                  alt="creator"
                  className="rounded-full"
                  height={32}
                  width={32}
                />
                <p className="line-clamp-1">{post.authorName}</p>
              </div>
            )}
            {showStats && user && <PostStats post={post} userId={user?._id} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
