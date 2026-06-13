import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home_page from "./features/auth/pages/home_page";
import Protected from "./features/auth/components/protected";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home_page /></Protected>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
