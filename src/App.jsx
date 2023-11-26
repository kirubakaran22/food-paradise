import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import MenuPage from "./Pages/Menu";
import { checkUserLoggedIn, logoutAction, queryClient } from "./util/http";
import CartPage from "./Pages/Cart";
import ErrorPage from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: checkUserLoggedIn,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
