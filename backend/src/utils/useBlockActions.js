import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export const handleBlockUser = async (selectedPartner) => {
  if (!selectedPartner) return;
  try {
    await axiosInstance.post("/api/users/block", {
      userIdToBlock: selectedPartner._id,
    });

    useAuthStore.getState().blockUser(selectedPartner);
    toast.success(`${selectedPartner.name} blocked`);
  } catch (err) {
    toast.error("Failed to block user");
  }
};

export const handleUnblockUser = async (userId) => {
  if (!userId) return;
  try {
    await axiosInstance.post("/api/users/unblock", {
      userIdToUnblock: userId,
    });

    useAuthStore.getState().unblockUser(userId);
    toast.success("User unblocked");
  } catch (err) {
    toast.error("Failed to unblock user");
  }
};