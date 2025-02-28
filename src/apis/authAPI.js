import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const loginAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/auth/login`, data);
};

export const handleLogoutAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/auth/login`, data);
};

export const refreshTokenAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/auth/login`, data);
};

