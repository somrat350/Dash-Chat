import { SettingsIcon } from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const pageFlow = [
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: <SettingsIcon size={16} />,
  },
];

const Settings = () => {
  return (
    <div>
      <Breadcrumb items={pageFlow} />
    </div>
  );
};

export default Settings;
