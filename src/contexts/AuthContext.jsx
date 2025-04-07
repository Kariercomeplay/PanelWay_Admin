import { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI } from '../apis/authAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khôi phục trạng thái user từ localStorage nếu có
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const res = await loginAPI(userData);
      const { accountResponse, jwtToken } = res.data;
      
      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(accountResponse));
      localStorage.setItem('access_token', jwtToken);
      
      // Cập nhật state
      setUser(accountResponse);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    // Xóa dữ liệu từ localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
