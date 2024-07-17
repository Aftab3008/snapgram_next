"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/lib/useDebounce";
import { usePathname, useRouter } from "next/navigation";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/explore?caption=${debouncedSearch}`);
    } else if (!debouncedSearch && pathname === "/explore") {
      router.push(`/explore`);
    }
  }, [router, debouncedSearch, pathname]);

  return (
    <div className="flex gap-1 px-4 w-full rounded-xl bg-dark-4">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />
      <Input
        type="text"
        placeholder="Search"
        className="explore-search"
        value={searchValue}
        onChange={(e) => {
          const { value } = e.target;
          setSearchValue(value);
        }}
        onLoad={() => setSearchValue("")}
      />
    </div>
  );
}
