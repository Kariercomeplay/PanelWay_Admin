import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine, RiFileTextLine, RiUserLine, RiAdvertisementLine,
  RiSettings4Line, RiLogoutBoxLine, RiArrowLeftLine, RiArrowRightLine
} from 'react-icons/ri';
import { LuPackage2 } from "react-icons/lu";
import { BsQuestionOctagon } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const mainMenuItems = [
    { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
    { icon: RiFileTextLine, text: 'Bài đăng quảng cáo', path: '/rental' },
    { icon: RiUserLine, text: 'Quản lí Người dùng', path: '/users' },
    { icon: RiMoneyDollarCircleFill, text: 'Quản lí Doanh Thu', path: '/revenue' },
    { icon: LuPackage2, text: ' Gói Thành viên', path: '/pack' },
    
  ];

  const comingSoonItems = [
    { icon: RiAdvertisementLine, text: 'Trung tâm Quảng cáo', path: '/ads' },
    { icon: BsQuestionOctagon, text: 'Trung tâm Trợ giúp', path: '/help' },
    // Bạn có thể thêm các tính năng sắp ra mắt khác tại đây
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`transition-all duration-300 relative h-screen bg-white border-r border-gray-200 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-gray-700"
      >
        {isCollapsed ? <RiArrowRightLine className="w-4 h-4" /> : <RiArrowLeftLine className="w-4 h-4" />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          
          {!isCollapsed && <span className="ml-2 font-semibold text-xl">PanelWay</span>}
        </div>
      </div>

      {/* Main menu */}
      <nav className="flex-1 p-4 space-y-6 overflow-auto">
        {/* Current Features */}
        <div>
          {!isCollapsed && <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Tính năng hiện tại</h3>}
          <ul className="space-y-2">
            {mainMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg ${location.pathname === item.path ||
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
        </div>

        {/* Coming Soon */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Sắp ra mắt</h3>
          )}
          <ul className="space-y-2">
            {comingSoonItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg ${location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  title={isCollapsed ? item.text : ''}
                >
                  <item.icon className="w-6 h-6" />
                  {!isCollapsed && <span className="ml-3">{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 rounded-lg ${location.pathname === '/settings'
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
              onClick={handleLogout}
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
