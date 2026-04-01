import { useQuery } from "@tanstack/react-query";
import { useFriendStore } from "../../../store/useFriendsStore";
import FRequestsCard from "./FRequestsCard";
import SectionHeader from "./SectionHeader";
import { LoaderIcon, UserPlus, Users } from "lucide-react";

const FriendsRequests = () => {
  const { getFriendRequests } = useFriendStore();
  const { data, isLoading } = useQuery({
    queryKey: ["friendsRequests"],
    queryFn: async () => getFriendRequests(),
  });

  return (
    <div>
      <SectionHeader
        title={"Friend Requests"}
        icon={<UserPlus size={20} className="text-primary" />}
      />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-5 gap-3 text-center">
          <div className="flex flex-col gap-1">
            <LoaderIcon size={30} className="animate-spin mx-auto" />
            <p className="text-[14px] font-medium">Checking for requests</p>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
          <div className="p-3 bg-primary/5 rounded-full mb-1 flex items-center justify-center">
            <UserPlus size={20} className="text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-[14px]">No friend requests right now.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4">
          {data.map((d) => (
            <FRequestsCard key={d._id} data={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsRequests;
