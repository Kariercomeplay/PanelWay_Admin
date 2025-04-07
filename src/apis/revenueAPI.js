import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

/**
 * Lấy toàn bộ giao dịch (bỏ lọc timePeriod, lọc ở client)
 * Dùng authorizedAxiosInstance để đảm bảo xác thực.
 */
export const getTransactions = async (page = 1, size = 1000) => {
  try {
    const response = await authorizedAxiosInstance.get(
      `${BASE_URL}/transactions?page=${page}&size=${size}`
    );
    const data = response.data;
    return data.items || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

/**
 * Lấy chi tiết giao dịch theo ID
 */
export const getTransactionDetails = async (id) => {
  try {
    const response = await authorizedAxiosInstance.get(
      `${BASE_URL}/transactions/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return null;
  }
};
