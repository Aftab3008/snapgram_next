import PostForm from "@/components/shared/PostForm";
import Image from "next/image";

export default function page() {
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
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm action="create" />
      </div>
    </div>
  );
}
