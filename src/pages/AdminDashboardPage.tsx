import { useAuth } from '@/context/AuthContext';
import React from 'react'

const AdminDashboardPage:React.FC = () => {
    const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-card rounded-lg shadow-md min-h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-700">
        Welcome, {user?.name || 'User'}! You are logged in as an {user?.role}.
      </p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Active Projects</h2>
          <p className="text-4xl font-bold text-green-600">56</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">New Orders</h2>
          <p className="text-4xl font-bold text-yellow-600">89</p>
        </div>
      </section>

      <section className="mt-8 bg-gray-50 dark:bg-gray-100 p-6 rounded-lg shadow-inner border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">&bull;</span> User 'Jane Doe' signed up.
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">&bull;</span> 'Project X' updated by Admin.
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">&bull;</span> New report generated for Q2.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default AdminDashboardPage