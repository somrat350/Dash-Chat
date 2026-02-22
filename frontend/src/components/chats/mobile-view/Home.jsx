import {  CameraIcon,    ChartBarBig,   MoreVertical, PhoneCall, RefreshCcw, Users } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";


const Home = () => {
  return (
  <div  className="min-h-screen  bg-gray-100 flex flex-col">
   {/** header */}
   <div className="bg-green-400 text-white p-4">
    <div className="flex justify-between">
      
       <h2 className="text-xl font-bold">  <NavLink to='/'>Desh-Chat</NavLink> </h2> 
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
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-4 bg-white  hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co.com/Z11kPvbY/Quantum.png"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">Quantum Coders</h2>
              <p className="text-sm text-gray-500">You: kaj Kori nai</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">10:04 AM</span>
        </div>
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