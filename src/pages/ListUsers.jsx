import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsersAPI, countUsersAPI } from '@/apis/userAPI'; // Đảm bảo đường dẫn đúng

const USERS_PER_PAGE = 10; // Số lượng người dùng mỗi trang

function ListUsers() {
  const [users, setUsers] = useState([]); // Lưu toàn bộ người dùng
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Gọi API để lấy tất cả người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Lấy tổng số người dùng
        const countuser = await countUsersAPI();

        // Lấy tất cả người dùng
        const result = await getAllUsersAPI(countuser.data); // Truyền vào số lượng người dùng tối đa bạn muốn lấy
        setUsers(result.items || []); // Lưu toàn bộ người dùng vào state
        setTotalUsers(countuser.data); // Lưu tổng số người dùng
        const totalPages = Math.ceil(countuser.data / USERS_PER_PAGE); // Tính số trang từ tổng số người dùng
        setTotalPages(totalPages); // Cập nhật tổng số trang
      } catch (err) {
        setError("Không thể tải danh sách người dùng.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []); // Chỉ gọi khi component mount

  // Lấy người dùng của trang hiện tại
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentPageUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  // Xử lý chuyển trang
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Chuyển giới tính sang tiếng Việt
  const translateGender = (gender) => {
    if (gender === 'Male') return 'Nam';
    if (gender === 'Female') return 'Nữ';
    return 'Khác'; // Trường hợp không xác định giới tính
  };

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
              <Link to="/users/list" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600">
                <span className="ml-2">Danh sách người dùng</span>
              </Link>
              <Link to="/users/gold" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="ml-2">Tài khoản Vàng</span>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Danh sách người dùng */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Danh sách người dùng</h3>

              {error ? (
                <p className="text-red-500">{error}</p>
              ) : currentPageUsers.length === 0 ? (
                <p>Không có người dùng nào.</p>
              ) : (
                <div className="overflow-auto">
                  <table className="min-w-full table-auto border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border">STT</th> {/* Thêm cột số thứ tự */}
                        <th className="px-4 py-2 border">Họ tên</th>
                        <th className="px-4 py-2 border">Username</th>
                        <th className="px-4 py-2 border">SĐT</th>
                        <th className="px-4 py-2 border">Trạng thái</th>
                        <th className="px-4 py-2 border">Giới tính</th> {/* Thêm cột giới tính */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{startIndex + index + 1}</td> {/* Tính số thứ tự */}
                          <td className="px-4 py-2 border">{user.fullName}</td>
                          <td className="px-4 py-2 border">{user.userName}</td>
                          <td className="px-4 py-2 border">{user.phoneNumber}</td>
                          <td className="px-4 py-2 border">
                            <span className={`px-2 py-1 rounded text-white text-xs ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 border">{translateGender(user.gender)}</td> {/* Hiển thị giới tính bằng tiếng Việt */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Phân trang */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handlePrevPage}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                <span className="self-center">Trang {currentPage} / {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
