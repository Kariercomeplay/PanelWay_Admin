import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { countUsersAPI, countNewUsersThisMonthAPI,getUserPurchasingVolumeThisMonthAPI   } from '@/apis/userAPI';  // Đảm bảo bạn đã export hàm này từ API
import { getUserBasicPackageAPI, getUserPremiumPackageAPI, getUserStandardPackageAPI, getUserAgeCountAPI } from '../apis/userAPI';


const timeData = [
  { name: 'T2', value: 45 },
  { name: 'T3', value: 30 },
  { name: 'T4', value: 35 },
  { name: 'T5', value: 55 },
  { name: 'T6', value: 35 },
  { name: 'T7', value: 0 },
  { name: 'CN', value: 0 },
];


const cityData = [
  { city: 'Hồ Chí Minh', percentage: 27.4 },
  { city: 'Hà Nội', percentage: 18.7 },
  { city: 'Bình Dương', percentage: 12.1 },
  { city: 'Vũng Tàu', percentage: 9.6 },
  { city: 'Huế, Đà Nẵng', percentage: 2.8 },
];
function Users() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [conversions, setConversions] = useState(0);
  const [basicUsers, setBasicUsers] = useState(0);
  const [standardUsers, setStandardUsers] = useState(0);
  const [premiumUsers, setPremiumUsers] = useState(0);
  const [ageData, setAgeData] = useState([]);

  const fetchAgeGroupData = async (minAge, maxAge) => {
    try {
      const response = await getUserAgeCountAPI(minAge, maxAge);  // Lấy dữ liệu cho mỗi nhóm độ tuổi
      return { name: `${minAge}-${maxAge}`, count: response };  // Trả về tên nhóm độ tuổi và số lượng
    } catch (error) {
      console.error(`Error fetching data for age group ${minAge}-${maxAge}:`, error);
      return { name: `${minAge}-${maxAge}`, count: 0 };  // Nếu có lỗi, trả về 0
    }
  };
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await countUsersAPI();
        setTotalUsers(response.data);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
  
    const fetchNewUserCount = async () => {
      try {
        const response = await countNewUsersThisMonthAPI();
        setNewUsers(response);
      } catch (error) {
        console.error('Error fetching new users count:', error);
      }
    };
  
    const fetchConversions = async () => {
      try {
        const response = await getUserPurchasingVolumeThisMonthAPI();
        setConversions(response);
      } catch (error) {
        console.error('Error fetching conversion count:', error);
      }
    };

    const fetchBasicUsers = async () => {
      try {
        const response = await getUserBasicPackageAPI();
        setBasicUsers(response.total); // Giả sử API trả về dữ liệu trong key `data`
      } catch (error) {
        console.error('Error fetching basic users count:', error);
      }
    };

    const fetchStandardUsers = async () => {
      try {
        const response = await getUserStandardPackageAPI();
        setStandardUsers(response.total);
      } catch (error) {
        console.error('Error fetching standard users count:', error);
      }
    };

    const fetchPremiumUsers = async () => {
      try {
        const response = await getUserPremiumPackageAPI();
        setPremiumUsers(response.total);
      } catch (error) {
        console.error('Error fetching premium users count:', error);
      }
    };

  
    fetchUserCount();
    fetchNewUserCount();
    fetchConversions();
    fetchBasicUsers();
    fetchStandardUsers();
    fetchPremiumUsers();
  }, []);
  useEffect(() => {
    // Các nhóm độ tuổi cần truy vấn
    const ageGroups = [
      { minAge: 18, maxAge: 25 },
      { minAge: 26, maxAge: 35 },
      { minAge: 36, maxAge: 45 },
      { minAge: 46, maxAge: 60 },
      { minAge: 60, maxAge: 100 },
    ];

    // Gọi API cho từng nhóm độ tuổi và cập nhật dữ liệu
    const fetchAllAgeData = async () => {
      const data = [];
      for (let i = 0; i < ageGroups.length; i++) {
        const groupData = await fetchAgeGroupData(ageGroups[i].minAge, ageGroups[i].maxAge);
        data.push(groupData);  // Thêm dữ liệu vào mảng
      }
      setAgeData(data);  // Cập nhật dữ liệu vào state
    };

    fetchAllAgeData();  // Gọi hàm để lấy dữ liệu
  }, []);
  const conversionRate = newUsers > 0 ? ((conversions / newUsers) * 100).toFixed(1) : 0;

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lí Người dùng</h1>

        <div className="flex space-x-6">
          <div className="w-64 bg-white rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/users"
                className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600"
              >
                <span className="ml-2">Người dùng</span>
              </Link>
              <Link
                to="/users/list"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span className="ml-2">Danh sách người dùng</span>
              </Link>
              <Link
                to="/users/gold"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span className="ml-2">Tài khoản Vàng</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Tổng số Người dùng</h3>
                    <p className="text-2xl font-bold mt-1">{totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Người dùng mới</h3>
                    <p className="text-2xl font-bold mt-1">{newUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Tỉ lệ chuyển đổi</h3>
                    <p className="text-2xl font-bold mt-1">{conversions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
                <div className="text-red-500 text-sm">
                  {conversionRate}%
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Loại Tài khoản</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Basic</span>
                    <span className="font-bold">{basicUsers}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Standard</span>
                    <span className="font-bold">{standardUsers}</span>
                  </div>
                  <div className="flex justify-between text-yellow-500">
                    <span>Premium</span>
                    <span className="font-bold">{premiumUsers}</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="grid grid-cols-2 gap-6">
            <div className="flex-1">
            <h3 className="text-lg font-medium mb-6">Phân bố người dùng theo độ tuổi</h3>
            {/* Biểu đồ phân bổ độ tuổi */}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-6">Tỉnh/thành phố có nhiều người dùng nhất</h3>
                <div className="space-y-4">
                  {cityData.map((item) => (
                    <div key={item.city} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.city}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Thời gian sử dụng</h3>
                  <h4 className="text-gray-500">Trung bình hàng ngày</h4>
                  <div className="text-2xl font-bold mt-2">10 giờ 50 phút</div>
                </div>
                <div className="flex items-center text-sm text-blue-500">
                  <span className="bg-blue-50 px-2 py-1 rounded">38% từ tuần trước</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#60A5FA"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
