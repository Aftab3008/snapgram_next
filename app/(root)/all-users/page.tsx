import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { getUsers } from "@/lib/appwrite/api";
import { currentUser } from "@clerk/nextjs/server";

const AllUsers = async () => {
  const creators = await getUsers();
  const user = await currentUser();

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Other Users</h2>
        {!creators && (
          <h2 className="text-2xl md:text-3xl font-bold leading-7 tracking-tighter text-left w-full">
            No Other Users
          </h2>
        )}
        <ul className="user-grid">
          {creators &&
            creators?.documents.map((creator: any) => {
              if (creator?.$id === user?.id) {
                return;
              }
              return (
                <li
                  key={creator?.$id}
                  className="flex-1 min-w-[200px] w-full  "
                >
                  <UserCard user={creator} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers;
