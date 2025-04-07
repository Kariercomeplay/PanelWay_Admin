import React from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const timeData = [
  { name: 'T2', value: 45 },
  { name: 'T3', value: 30 },
  { name: 'T4', value: 35 },
  { name: 'T5', value: 55 },
  { name: 'T6', value: 35 },
  { name: 'T7', value: 0 },
  { name: 'CN', value: 0 },
];

const salesData = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  current: Math.floor(Math.random() * (70 - 25 + 1)) + 25,
  previous: Math.floor(Math.random() * (65 - 20 + 1)) + 20,
}));

function GoldUsers() {
  const stats = [
    {
      title: "Tổng số lượt mua",
      value: "1080",
      icon: "🛒",
      trend: "1.8% Up from yesterday",
      trendColor: "text-green-500",
    },
    {
      title: "Doanh thu",
      value: "1B",
      icon: "💰",
      trend: "1.8% Up from yesterday",
      trendColor: "text-green-500",
    },
    {
      title: "Lượt gia hạn",
      value: "800",
      icon: "🔄",
      trend: "4.3% Down from yesterday",
      trendColor: "text-red-500",
    },
    {
      title: "Lượt mua mới",
      value: "500",
      icon: "⭐",
      trend: "1.8% Up from yesterday",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lí Người dùng</h1>

        <div className="flex space-x-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <Link to="/users" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="ml-2">Người dùng</span>
              </Link>
              <Link to="/users/list" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="ml-2">Danh sách người dùng</span>
              </Link>
              <Link to="/users/gold" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600">
                <span className="ml-2">Tài khoản Vàng</span>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm text-gray-500">{stat.title}</h3>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`${stat.trendColor} text-sm`}>{stat.trend}</div>
                </div>
              ))}
            </div>

            {/* Sales chart */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Sale Analytics</h3>
                <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                  <option>Năm 2025</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#60A5FA"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke="#064E3B"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Usage time chart */}
            <div className="bg-white p-6 rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoldUsers;
