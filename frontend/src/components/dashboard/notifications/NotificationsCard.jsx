import { UserPlus, MessageCircle, CheckCircle } from "lucide-react";
import { useNotificationStore } from "../../../store/useNotificationStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const iconMap = {
  friend_request: <UserPlus size={14} className="text-primary" />,
  message: <MessageCircle size={14} className="text-info" />,
  accepted: <CheckCircle size={14} className="text-success" />,
  rejected: <CheckCircle size={14} className="text-warning" />,
  unfriend: <MessageCircle size={14} className="text-error" />,
};

const NotificationsCard = ({ notification }) => {
  const { markNotificationAsRead } = useNotificationStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const n = notification;

  const formatNotificationTime = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Just now";

    const now = new Date();
    const diffMs = now - date.getTime();
    const minuteMs = 60 * 1000;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;

    if (diffMs < minuteMs) return "Just now";
    if (diffMs < hourMs) return `${Math.floor(diffMs / minuteMs)}m ago`;
    if (diffMs < dayMs) return `${Math.floor(diffMs / hourMs)}h ago`;

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const markRead = async (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (n.isRead) return;
    await markNotificationAsRead(n._id);

    // Update the infinite query cache structure
    queryClient.setQueryData(["notifications"], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.map((item) =>
            item._id === n._id ? { ...item, isRead: true } : item,
          ),
        ),
      };
    });
  };

  const handleClick = async () => {
    if (n.type === "friend_request") {
      await markRead();
      navigate("/dashboard/friends");
      return;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:bg-base-100 hover:translate-x-1
        ${
          n.isRead
            ? "border-base-200 bg-base-100"
            : "border-l-4 border-primary bg-base-300"
        }`}
    >
      <div className="relative">
        <img
          src={n.sender?.photoURL || "/default-avatar.jpg"}
          alt={n.sender?.name}
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <div className="absolute -bottom-1 -right-1 bg-base-100 border border-base-300 rounded-full p-1">
          {iconMap[n.type]}
        </div>
        {!n.isRead && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-base-100"></span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">{n.sender?.name}</span> {n.message}
        </p>

        <p className="text-xs text-base-content/60 mt-1">
          {formatNotificationTime(n.createdAt)}
        </p>
      </div>

      {/* friend request actions */}
      <div className="flex gap-2">
        {!n.isRead && (
          <button onClick={markRead} className="btn btn-xs btn-info">
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationsCard;
