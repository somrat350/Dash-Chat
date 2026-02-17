import { Link } from "react-router";
import logoImg from "../../assets/DashChat-logo.png";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-xl font-bold text-primary flex items-center">
        <img
          src={logoImg}
          alt="DashChat Logo"
          className="inline-block w-14 h-14"
        />
        <span className="-ms-2">DashChat</span>
      </Link>
    </div>
  );
};

export default Logo;
