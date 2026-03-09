import { BellIcon } from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const pageFlow = [
  {
    label: "Notifications",
    link: "/dashboard/notifications",
    icon: <BellIcon size={16} />,
  },
];

const Notifications = () => {
  return (
    <div>
      <Breadcrumb items={pageFlow} />
    </div>
  );
};

export default Notifications;
