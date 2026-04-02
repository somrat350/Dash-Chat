import { useQuery } from "@tanstack/react-query";
import { useFriendStore } from "../../../store/useFriendsStore";
import SectionHeader from "./SectionHeader";
import { LoaderIcon, UserPlus, UserPlus2 } from "lucide-react";
import SFriendsCard from "./SFriendsCard";

const SuggestedFriends = () => {
  const { getFriendSuggestions } = useFriendStore();
  const { data = [], isLoading } = useQuery({
    queryKey: ["suggestedFriends"],
    queryFn: async () => getFriendSuggestions(),
  });
  return (
    <div>
      <SectionHeader
        title={"Suggested Friends"}
        icon={<UserPlus2 size={20} className="text-primary" />}
      />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-5 gap-3 text-center">
          <div className="flex flex-col gap-1">
            <LoaderIcon size={30} className="animate-spin mx-auto" />
            <p className="text-[14px] font-medium">
              Checking for suggested friends
            </p>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
          <div className="p-3 bg-primary/5 rounded-full mb-1 flex items-center justify-center">
            <UserPlus size={20} className="text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-[14px]">No suggested friends right now.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4">
          {data.map((d) => (
            <SFriendsCard key={d._id} data={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedFriends;
