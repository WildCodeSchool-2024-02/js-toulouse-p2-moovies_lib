import "./reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Filter from "./pages/Filter";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import HeaderLayout from "./layouts/HeaderLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
      {
        path: "/details/:filmid",
        element: <Details />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>,
);
