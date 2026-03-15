import { MessageCircleIcon } from "lucide-react";

const NoPartnerSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Select a partner
      </h3>
      <p className="text-slate-400 max-w-md">
        Choose a partner from the sidebar to start chatting or continue a
        previous conversation.
      </p>
    </div>
  );
};

export default NoPartnerSelected;
