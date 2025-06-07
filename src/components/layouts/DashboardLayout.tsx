import React, { useState } from 'react'
import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout:React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className='flex h-screen bg-gray-100 w-full'>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Page content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-4 lg:p-6">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout