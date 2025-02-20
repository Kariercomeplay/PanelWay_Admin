import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine, RiFileTextLine, RiUserLine, RiAdvertisementLine, RiQuestionLine, RiSettings4Line, RiLogoutBoxLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { BsQuestionOctagon } from "react-icons/bs";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
    { icon: RiFileTextLine, text: 'Nội dung', path: '/content' },
    { icon: RiUserLine, text: 'Quản lí Người dùng', path: '/users' },
    { icon: RiAdvertisementLine, text: 'Trung tâm Quảng cáo', path: '/ads' },
    { icon: BsQuestionOctagon, text: 'Trung tâm Trợ giúp', path: '/help' },
  ];

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-gray-700"
      >
        {isCollapsed ? (
          <RiArrowRightLine className="w-4 h-4" />
        ) : (
          <RiArrowLeftLine className="w-4 h-4" />
        )}
      </button>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/476330707_122104752284750484_5215047765037178064_n.jpg" alt="PaneWay" className="h-8" />
          {!isCollapsed && <span className="ml-2 font-semibold text-xl">PaneWay</span>}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === item.path || 
                  (item.path === '/users' && location.pathname.startsWith('/users'))
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isCollapsed ? item.text : ''}
              >
                <item.icon className="w-6 h-6" />
                {!isCollapsed && <span className="ml-3">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === '/settings'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isCollapsed ? 'Cài đặt' : ''}
            >
              <RiSettings4Line className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3">Cài đặt</span>}
            </Link>
          </li>
          <li>
            <button 
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
              title={isCollapsed ? 'Đăng xuất' : ''}
            >
              <RiLogoutBoxLine className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3">Đăng xuất</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;