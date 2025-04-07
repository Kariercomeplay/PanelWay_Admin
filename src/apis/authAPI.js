import authorizedAxiosInstance from '@/utils/authorizedAxios';

/**
 * Hàm gọi API đăng nhập.
 * Sau khi đăng nhập thành công, bạn cần lưu thông tin user và access_token vào localStorage.
 */
export const loginAPI = async (data) => {
  try {
    const response = await authorizedAxiosInstance.post('/auth/login', data);

    // Kiểm tra nếu phản hồi từ BE hợp lệ và có data jwtToken và accountResponse
    if (response && response.data && response.data.jwtToken && response.data.accountResponse) {
      const { accountResponse, jwtToken } = response.data;
      
      // Lưu thông tin user và token vào localStorage
      localStorage.setItem('user', JSON.stringify(accountResponse));
      localStorage.setItem('access_token', jwtToken);

      // Trả về data nếu cần dùng ở nơi khác
      return {
        account: accountResponse,
        token: jwtToken
      };
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    // Lỗi API hoặc lỗi trong xử lý response
    console.error('Login API error:', error);
    throw new Error('Có lỗi xảy ra trong quá trình đăng nhập, vui lòng thử lại.');
  }
};

/**
 * Hàm xử lý logout.
 * Vì BE chỉ có endpoint login nên logout chỉ thực hiện việc xóa thông tin ở client.
 */
export const handleLogoutAPI = async () => {
  try {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');

    // Nếu có API logout ở BE, có thể gọi ở đây, ví dụ:
    // await authorizedAxiosInstance.post('/auth/logout');

    return Promise.resolve();  // Trả về Promise.resolve() khi logout thành công
  } catch (error) {
    // Lỗi khi xóa thông tin đăng nhập
    console.error('Logout API error:', error);
    return Promise.reject('Có lỗi xảy ra trong quá trình đăng xuất.');
  }
};
