import { MessageCircleIcon } from "lucide-react";
import AddPartnerModal from "./AddPartnerModal";

const NoPartnerFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">
          No conversations yet
        </h4>
        <p className="text-slate-400 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button className="cursor-pointer px-4 py-2 text-sm text-primary bg-primary/20 rounded-lg hover:bg-primary/40 transition-colors">
        Add partner
      </button>
      <AddPartnerModal/>
    </div>
  );
};

export default NoPartnerFound;
