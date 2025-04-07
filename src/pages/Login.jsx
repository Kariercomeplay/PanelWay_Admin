import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginAPI } from '@/apis/authAPI';  // Import hàm loginAPI từ file API

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // State để lưu thông báo lỗi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi trước khi gửi request

    const body = {
        phoneNumber: phone,
      password: password,
      role: 'Manager', // Ví dụ role là Manager
    };

    try {
      // Gọi API đăng nhập trực tiếp thay vì dùng context
      const response = await loginAPI(body);

      // Sau khi đăng nhập thành công, lưu thông tin vào localStorage (nếu cần)
      if (response && response.account && response.token) {
        localStorage.setItem('user', JSON.stringify(response.account));
        localStorage.setItem('access_token', response.token);

        navigate('/'); // Nếu đăng nhập thành công, chuyển hướng về trang chủ
      }
    } catch (err) {
      // Kiểm tra lỗi trả về từ API
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.'); // Thông báo lỗi chung
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#74ACFF]">
      <div className="bg-white rounded-lg p-8 w-full max-w-md z-10 shadow-xl border-4 border-white/30 justify-center">
        <div className="text-center mt-[50px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập Quản trị viên</h2>
          <p className="text-gray-600 text-sm mb-4">
            Vui lòng nhập thông tin đăng nhập để truy cập hệ thống quản trị.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-center text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700 text-left">
                Thông tin đăng nhập
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                pattern="[0-9]{10,11}"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="• • • • • • • •"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500"
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
