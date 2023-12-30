import React from "react";
import Users from "./Components/Users/Users";
import UserDetails from "./Components/UserDetails/UserDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
    {
      path: "/userDetails/:id",
      element: <UserDetails />, // Route to UserDetails component with ID parameter
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
