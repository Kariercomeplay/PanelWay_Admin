import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const countUsersAPI = async () => {
    return await authorizedAxiosInstance.get(`${BASE_URL}/users/count`);
  };

  export const countRentalLocationAPI = async () => {
    return await authorizedAxiosInstance.get(`https://localhost:7187/rental-locations/count`);
  };