import React from 'react';

function Settings() {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt chung</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên trang web
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="PanelWay Web"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề SEO
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="PanelWay web is a hybrid dashboard"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ khoá SEO
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="CEO"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copy Right
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="All rights Reserved@PanelWayweb"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả SEO
              </label>
              <textarea
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 h-32"
                placeholder="PanelWay web is a hybrid dashboard"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;