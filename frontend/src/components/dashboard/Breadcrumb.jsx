import { HomeIcon } from "lucide-react";
import { Link } from "react-router";

const Breadcrumb = ({ items = [] }) => {
  const dashboard = {
    label: "Home",
    link: "/dashboard",
    icon: <HomeIcon size={16} />,
  };
  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        {[dashboard, ...items].map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link to={item.link} className="flex items-center gap-2">
                {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-gray-500">
                {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
