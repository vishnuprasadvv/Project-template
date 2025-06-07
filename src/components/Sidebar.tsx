import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, Users, X } from "lucide-react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LOGO from '/Xaults_logo_light.png';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/dashboard/users", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },

    // Add more dashboard links here
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-30 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar itself */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 transform transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0" // Always visible on large screens
        )}
      >
        <div className="flex items-center mb-4 py-8">
            <Link to='/dashboard' className='flex w-full items-center justify-center'>
                {/* Company logo */}
                <img
            src={LOGO}
            alt="Company Logo"
            className="w-35"
          />
            </Link>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="lg:hidden absolute right-0 top-0 m-1 hover:bg-gray-700 text-gray-500 hover:text-gray-300"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 size-0" />
          </Button>
        </div>

        <nav className="space-y-2">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (location.pathname.startsWith(link.path) &&
                link.path !== "/dashboard");
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center p-3 rounded-md transition-colors duration-200",
                  isActive
                    ? "bg-lime-300/10 bg-blend-screen text-lime-300 shadow-md"
                    : "text-gray-300 hover:  hover:text-white"
                )}
                onClick={toggleSidebar}
              >
                <link.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
