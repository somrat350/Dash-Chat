import { LucidePhone } from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const pageFlow = [
  {
    label: "Calls",
    link: "/dashboard/calls",
    icon: <LucidePhone size={16} />,
  },
];

const Calls = () => {
  return (
    <div>
      <Breadcrumb items={pageFlow} />
    </div>
  );
};

export default Calls;
