import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Đếm số lượng người dùng
export const countUsersAPI = async () => {
  const res = await authorizedAxiosInstance.get(`${BASE_URL}/users/count`);
  return res.data;
};

// Đếm số lượng điểm quảng cáo
export const countRentalLocationAPI = async () => {
  const res = await authorizedAxiosInstance.get(`${BASE_URL}/rental-locations/count`);
  return res.data;
};



export const getAppointments = async () => {
  const response = await authorizedAxiosInstance.get(`${BASE_URL}/appointments`, {
    params: { page: 1, size: 1000 },
  });
  return response.data;
};

export const getRentalLocations = async () => {
  const response = await authorizedAxiosInstance.get(`${BASE_URL}/rental-locations`, {
    params: { page: 1, size: 1000 },
  });
  return response.data;
};

export const getTransactions = async () => {
  const response = await authorizedAxiosInstance.get(`${BASE_URL}/transactions`, {
    params: { page: 1, size: 1000 },
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await authorizedAxiosInstance.get(`${BASE_URL}/users`, {
    params: { page: 1, size: 1000 },
  });
  return response.data;
};

