import { useRoutes } from "react-router-dom";
import { LoginPage } from "@/pages";

export function AppRouter() {
  return useRoutes([
      {
          path: "/",
          element: <LoginPage />,
      },
      ]);
}
