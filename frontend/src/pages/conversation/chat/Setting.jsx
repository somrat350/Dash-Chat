

import {  BellRing, CircleQuestionMark, KeyboardMusic,  LogOutIcon, Settings,  } from 'lucide-react';
import { useMessageStore } from '../../../store/useMessageStore';
import { useAuthStore } from '../../../store/useAuthStore';

const SettingPage = () => {
     const { logoutUser } = useAuthStore();
    const {selectedPartner} = useMessageStore();
    return (
      <div className="h-full flex bg-base-100">
      {/* Left Sidebar */}
      <div className="w-[350px] border-r p-5 space-y-4">
        <h2 className="text-xl font-semibold">Settings</h2>

        {/* Profile info */}
        <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-base-200">
          <img
            src={selectedPartner?.photoURL}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p className="font-semibold">{selectedPartner?.name}</p>
            <p className="text-sm opacity-60">View your profile</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2 mt-4 ">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
            <BellRing size={20}/>  
            <div className='flex flex-col items-start' >
                <h2 className='tex-xl font-semibold'>Notification</h2>
                <p className='text-sm text-gray-400'>Massage notification</p>

            </div>
           
          </button>

          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
            <KeyboardMusic size={20}/>  
             <div className='flex flex-col items-start'>
                <h2 className='tex-xl font-semibold'>Keyboards shortcuts</h2>
                <p className='text-sm text-gray-400'>Quick actions</p>

            </div>
           
          </button>

          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
            <CircleQuestionMark size={20}/>  
             <div className='flex flex-col items-start'>
                <h2 className='tex-xl font-semibold'>Help and feedback</h2>
                <p className='text-sm text-gray-400'>Help centre,contac us, privecy policy</p>

            </div>
          </button>

          

          <button 
            className=" flex items-center gap-3 lounded-lg hover:bg-red-100 text-red-600 w-full"
                  onClick={logoutUser}
                
                  
                >
                  
                  <LogOutIcon size={24} />
                  <span className='text-lg font-semibold'>Logout</span>
                </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center opacity-70">
          <Settings size={40} className="mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <p className="text-sm">Select an option from the left menu</p>
        </div>
      </div>
    </div>
    );
};

export default SettingPage;