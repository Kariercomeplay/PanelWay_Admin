import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const countUsersAPI = async () => {
    return await authorizedAxiosInstance.get(`${BASE_URL}/users/count`);
  };

  const getStartAndEndOfCurrentMonth = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày 1 của tháng hiện tại
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối cùng của tháng hiện tại
  
    // Chuyển ngày sang định dạng MM/DD/YYYY
    const formatDate = (date) => {
      const month = date.getMonth() + 1; // Tháng (0-11)
      const day = date.getDate();
      const year = date.getFullYear();
  
      return `${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}/${year}`;
    };
  
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  };
  
  export const countNewUsersThisMonthAPI = async () => {
    const { startDate, endDate } = getStartAndEndOfCurrentMonth();
    
    try {
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/users/date-count?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data; // Trả về số lượng người dùng mới
    } catch (error) {
      console.error("Error fetching new users count:", error);
      throw error; // Nếu có lỗi xảy ra, ném lỗi để xử lý tại nơi gọi API
    }
  };

  export const getUserPurchasingVolumeThisMonthAPI = async () => {
    const { startDate, endDate } = getStartAndEndOfCurrentMonth();
  
    try {
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/user-subscriptions/purchasing-volume?status=Active&startDate=${startDate}&endDate=${endDate}`
      );
      return response.data; // Ví dụ: số tiền tổng hoặc số đơn hàng...
    } catch (error) {
      console.error("Error fetching user purchasing volume:", error);
      throw error;
    }
  };
  export const getUserStandardPackageAPI = async () => {
    try {
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/user-subscriptions/subcription/68BB374F-30BA-4ED4-9342-0C44573788AA`,
        {
          params: {
            status: 'Active',
            size: 1000,
            page: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user standard package:", error);
      throw error;
    }
  };
  export const getUserPremiumPackageAPI = async () => {
    try {
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/user-subscriptions/subcription/c0683f99-43f9-4b20-b8e9-ae4ee66632ce`,
        {
          params: {
            status: 'Active',
            size: 1000,
            page: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user premium package:", error);
      throw error;
    }
  };
  export const getUserBasicPackageAPI = async () => {
    try {
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/user-subscriptions/subcription/d252a7ca-0566-4b0f-a3d8-2c6aa34db2e3`,
        {
          params: {
            status: 'Active',
            size: 1000,
            page: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user basic package:", error);
      throw error;
    }
  };
  
  // API to get user age count based on age ranges and gender
  export const getUserAgeCountAPI = async (minAge, maxAge) => {
    try {
      // Gọi API để lấy dữ liệu phân bổ độ tuổi dựa trên khoảng độ tuổi
      const response = await authorizedAxiosInstance.get(
        `${BASE_URL}/users/age-count`,
        {
          params: {
            minAge: minAge,
            maxAge: maxAge
          }
        }
      );
      
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error fetching user age count:", error);
      throw error; // Trả về lỗi để xử lý ở hàm gọi
    }
  };
  export const getAllUsersAPI = async (totalUsers) => {
    try {
      const response = await authorizedAxiosInstance.get(`${BASE_URL}/users`, {
        params: {
          page: 1,   // Chỉ gọi trang 1
          size: totalUsers,   // Lấy toàn bộ người dùng
        },
      });
  
      const { data } = response;
  
      return {
        items: data.items, // Danh sách người dùng
        totalUsers: data.totalUsers, // Tổng số người dùng
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  
  export const getAccountInfo = async (accountId) => {
    try {
        const response = await authorizedAxiosInstance.get(`${BASE_URL}/accounts/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
};