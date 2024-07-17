"use client";

import GridPostList from "@/components/shared/GridPostList";
import { SavedSkeleton } from "@/components/shared/SavedSkeleton";
import Searchbar from "@/components/shared/Searchbar";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import useDebounce from "@/lib/useDebounce";
import { usePaginatedQuery, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = ({
  searchParams: { caption },
}: {
  searchParams: { caption: string };
}) => {
  const { ref, inView } = useInView();

  const {
    results: posts,
    status,
    isLoading,
    loadMore,
  } = usePaginatedQuery(
    api.posts.searchPosts,
    { searchValue: caption || "" },
    { initialNumItems: 6 }
  );

  useEffect(() => {
    if (inView && status === "CanLoadMore") {
      loadMore(6);
    }
  }, [inView, status]);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <Searchbar />
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <Image
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {!isLoading ? (
          <GridPostList posts={posts} />
        ) : (
          <>
            <SavedSkeleton />
            <SavedSkeleton />
          </>
        )}
      </div>
      {status === "CanLoadMore" && (
        <div ref={ref} className="mt-2">
          <SavedSkeleton />
        </div>
      )}
    </div>
  );
};

export default Explore;
