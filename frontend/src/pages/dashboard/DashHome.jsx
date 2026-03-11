import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-router";
import NoFriendsFound from "../../components/dashboard/NoFriendsFound";
import FriendCard from "../../components/dashboard/FriendCard";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import FeatureUnderDeveloping from "../../components/FeatureUnderDeveloping";

const DashHome = () => {
  const developing = true;
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/users");
      return res.data;
    },
  });
  const { data: recentMessages = [], isLoading: loadingRecentMessages } =
    useQuery({
      queryKey: ["recentMessages"],
      queryFn: async () => {
        const res = await axiosInstance.get("/api/messages/recentMessages");
        return res.data;
      },
    });

  if (developing) return <FeatureUnderDeveloping />;

  return (
    <div>
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Recent Messages
          </h2>
        </div>

        {loadingRecentMessages ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : recentMessages.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentMessages.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet New Users
              </h2>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new message partners!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recommendedUsers.map((user) => {
                return (
                  <div className="card w-full max-w-sm bg-base-200 shadow-xl border border-base-200">
                    {/* User Image */}
                    <figure className="px-10 pt-10">
                      <img
                        src={user.photoURL || "/default-avatar.jpg"}
                        alt={user.name}
                        className="rounded-full w-32 h-32 object-cover border-4 border-primary/10"
                      />
                    </figure>

                    <div className="card-body items-center text-center">
                      {/* Name */}
                      <h2 className="card-title text-xl font-bold">
                        {user.name}
                      </h2>

                      {/* Bio with 2-line clamp */}
                      <p className="text-sm opacity-70 line-clamp-2">
                        {user.bio}
                      </p>

                      {/* Action Button */}
                      <div className="card-actions mt-4 w-full">
                        <button className="btn btn-primary btn-block normal-case">
                          Add Friend
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashHome;
