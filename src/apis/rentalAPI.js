
import authorizedAxiosInstance from '@/utils/authorizedAxios';
import { BASE_URL } from "@/configs/globalVariables";

// 1. Lấy danh sách rental locations với phân trang
export const fetchRentalLocations = async ( page , size ) => {
  const url = `${BASE_URL}/rental-locations?page=${page}&size=${size}`;
  const response = await authorizedAxiosInstance.get(url);
  return response.data;
};

// 2. Lấy rental locations theo toạ độ
export const fetchRentalLocationsByBounds = async ({ minLat, minLng, maxLat, maxLng }) => {
  const url = `${BASE_URL}/rental-locations/latitude-longitude?minLat=${minLat}&minLng=${minLng}&maxLat=${maxLat}&maxLng=${maxLng}`;
  const response = await authorizedAxiosInstance.get(url);
  return response.data;
};

// 3. Lấy chi tiết rental location theo ID
export const fetchRentalLocationById = async (id) => {
  const url = `${BASE_URL}/rental-locations/${id}`;
  const response = await authorizedAxiosInstance.get(url);
  return response.data;
};

// 4. Lấy tổng số lượng rental locations
export const fetchRentalLocationCount = async () => {
  const url = `https://staging.panelway.online/rental-locations/count`;
  const response = await authorizedAxiosInstance.get(url);
  return response.data;
};
