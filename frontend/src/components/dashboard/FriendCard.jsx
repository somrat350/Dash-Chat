import { Link } from "react-router";

const FriendCard = () => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src="/default-avatar.jpg" alt="" />
          </div>
          <h3 className="font-semibold truncate">name</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">Native:</span>
          <span className="badge badge-outline text-xs">Learning:</span>
        </div>

        <Link to={`/chat`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
