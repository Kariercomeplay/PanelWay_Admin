// apis/subscriptionAPI.js
import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getSubscriptionName = async (id) => {
  if (!id) return "Không có ID";

  try {
    const res = await authorizedAxiosInstance.get(
      `${BASE_URL}/subscriptions/${id}`
    );

    if (res?.data?.name) {
      return res.data.name;
    }

    return "Không rõ tên gói";
  } catch (error) {
    console.error("Lỗi khi lấy tên subscription:", error);
    return "Không thể lấy tên gói";
  }
};
export const getAllSubscriptions = async () => {
    const res = await authorizedAxiosInstance.get(`${BASE_URL}/subscriptions`);
    return res.data;
  };