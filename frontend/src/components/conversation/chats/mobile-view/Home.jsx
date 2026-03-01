import {
  CameraIcon,
  ChartBarBig,
  MoreVertical,
  PhoneCall,
  RefreshCcw,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { useMessageStore } from "../../../../store/useMessageStore";
import { useEffect } from "react";



const Home = () => {

  const { messagePartners,
    fetchMessagePartners,

    setSelectedPartner,
    messagePartnersLoading } = useMessageStore();

  useEffect(() => {
    fetchMessagePartners();
  }, [fetchMessagePartners]);



  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col">
      {/** header */}
      <div className="bg-green-400 text-white p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">
            {" "}
            <Link to="/">DashChat</Link>{" "}
          </h2>
          <div className="flex items-center gap-2">
            <CameraIcon></CameraIcon>
            <MoreVertical></MoreVertical>
          </div>
        </div>
      </div>

      {/**   Search */}
      <div className="p-3 bg-white">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-full bg-gray-100 outline-none"
        />
      </div>
      {/** chat  */}
      <div className="flex-1 overflow-y-auto bg-white">
        {messagePartnersLoading ? (
          <p className="text-center p-5 text-gray-400">Loading chats...</p>
        ) : (
          messagePartners.map((partner) => (
            <div
              key={partner._id} // ব্যাকেন্ডের আইডি
              onClick={() => setSelectedPartner(partner)}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={partner.photoURL || "https://via.placeholder.com/150"}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{partner.name}</h2>

                </div>
              </div>
              <span className="text-[10px] text-gray-400">Now</span>
            </div>
          ))
        )}
      </div>


      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white  flex justify-around p-2">
        <button className="flex flex-col items-center text-green-600">
          <ChartBarBig size={22} />
          <span className="text-xs font-semibold">Chats</span>
        </button>

        <button className="flex flex-col items-center text-gray-600">
          <RefreshCcw size={22}></RefreshCcw>
          <span className="text-xs font-semibold">Updates</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <Users size={22}></Users>
          <span className="text-xs font-semibold">Communities</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <PhoneCall size={22}></PhoneCall>
          <span className="text-xs font-semibold">Calls</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
