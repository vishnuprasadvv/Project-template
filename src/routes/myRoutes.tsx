import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import {Home} from "@/pages/Home";
import { LoginPage } from "@/pages/LoginPage";
import { NotFound } from "@/pages/NotFound";
import { SignupPage } from "@/pages/SignupPage";
import UnAuthorized from "@/pages/UnAuthorized";
import { useRoutes } from "react-router-dom";

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginPage />},
    { path: "/signup", element: <SignupPage />},

    // Protected routes
    {
    element: <ProtectedRoute />, // Wrapper for protected routes
    children: [
      {
        path: "/dashboard",
        element: (
          <DashboardLayout>
            <AdminDashboardPage />
          </DashboardLayout>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <DashboardLayout>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="mt-4">Only accessible to authenticated users.</p>
            </div>
          </DashboardLayout>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <DashboardLayout>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold">App Settings</h1>
              <p className="mt-4">Configure application settings here.</p>
            </div>
          </DashboardLayout>
        ),
      },
    ],
  },

    { path: "/unauthorized", element: <UnAuthorized /> },

    { path: "*", element: <NotFound /> }, // Basic Not Found page
  ];

export default function MyRoutes() {
  return useRoutes(routes);
}
