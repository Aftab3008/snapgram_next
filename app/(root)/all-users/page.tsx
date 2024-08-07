"use client";
import UserCard from "@/components/shared/UserCard";
import { UserSkeleton } from "@/components/shared/UserSkeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const AllUsers = () => {
  const creators = useQuery(api.users.getUsers);
  const currentUser = useQuery(api.users.getCurrentUser);

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Other Users</h2>
        {!creators || !currentUser ? (
          <div className="user-grid">
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
          </div>
        ) : creators.length === 0 ? (
          <div className="flex w-full items-center justify-center mt-10 text-2xl text-light-3">
            No other Users
          </div>
        ) : (
          <ul className="user-grid">
            {creators.map((creator) => (
              <li key={creator._id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} currentUser={currentUser} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
