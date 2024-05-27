// import Loader from "@/components/shared/Loader";
// import PostCard from "@/components/shared/PostCard";
// import { getRecentPosts } from "@/lib/appwrite/api";
// import { Models } from "appwrite";

export default async function Home() {
  // const posts = await getRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="text-2xl md:text-3xl font-bold leading-7 tracking-tighter text-left w-full">
            Home Feed
          </h2>
          {/* {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
}
