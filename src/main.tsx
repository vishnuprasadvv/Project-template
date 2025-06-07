import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore.ts";

// Optional: Sentry initialization for error monitoring
// import * as Sentry from '@sentry/react';
// Sentry.init({
//   dsn: "YOUR_SENTRY_DSN_HERE", // Replace with your actual Sentry DSN
//   integrations: [
//     Sentry.reactRouterV6BrowserTracingIntegration({
//       // Optional: configure your router here if needed
//       useEffect: React.useEffect,
//       useLocation: Sentry.reactRouterV6Instrumentation.useLocation,
//       useNavigationType: Sentry.reactRouterV6Instrumentation.useNavigationType,
//       createRoutesFromChildren: Sentry.reactRouterV6Instrumentation.createRoutesFromChildren,
//       matchRoutes: Sentry.reactRouterV6Instrumentation.matchRoutes,
//     }),
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   tracesSampleRate: 1.0,
//   // Set `debug: true` to enable debugging for this SDK
//   // when experimenting with Sentry, or when in development.
//   debug: import.meta.env.DEV, // Only enable in development
// });

// Initialize TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Prevents refetching on window focus by default
    },
  },
});

// Component to handle theme application to HTML element
const ThemeApplier: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement; // This is the <html> element
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Wrap the App with AuthProvider */}
      <AuthProvider>
        <ThemeApplier>
          <App />
        </ThemeApplier>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
