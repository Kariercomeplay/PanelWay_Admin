import axios from 'axios';
import { BASE_URL } from '@/configs/globalVariables';

// Khởi tạo axios instance với cấu hình cơ bản
const authorizedAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 60 * 1000, // Thời gian timeout là 10 phút
  withCredentials: true,   // Đảm bảo gửi kèm cookie/credentials nếu có
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy token từ localStorage
const getToken = () => localStorage.getItem('access_token');

// Request interceptor: Tự động gắn Authorization header nếu token có trong localStorage
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Nếu nhận lỗi 401 hoặc 410 (token hết hạn/không hợp lệ)
// Thực hiện xóa thông tin đăng nhập khỏi localStorage và chuyển hướng về trang login.
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    return response; // Trả về response nếu không có lỗi
  },
  async (error) => {
    if (error.response) {
      // Xử lý lỗi 401 và 410, cho thấy token hết hạn
      if (error.response.status === 401 || error.response.status === 410) {
        // Xóa thông tin đăng nhập khỏi localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        
        // Hiển thị thông báo lỗi người dùng đã hết hạn phiên đăng nhập
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        
        // Chuyển hướng về trang login
        window.location.replace('/login');  // Change to window.location.replace for smoother experience
      } else {
        // Lỗi khác có thể là mạng hoặc lỗi từ server
        console.error('API Response Error:', error.response || error.message);
      }
    } else {
      // Trường hợp lỗi không có response (chẳng hạn lỗi mạng)
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
