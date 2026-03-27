import { MessageCircleIcon } from "lucide-react";

const NoPartnerSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Your inbox is ready</h3>
      <p className="text-slate-400 max-w-md">
        Pick a contact from the sidebar to start a real-time conversation, jump
        back into active threads, and stay in sync instantly.
      </p>
    </div>
  );
};

export default NoPartnerSelected;
