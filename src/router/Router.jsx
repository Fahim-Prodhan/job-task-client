import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root/Root";
import ErrorElement from "../pages/errorElement/ErrorElement";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorElement></ErrorElement>,
    children:[
      {
          path:'/',
          element:<PrivateRoute><Home></Home></PrivateRoute>,     
      },
      {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Register></Register>
    },
    ]
  }
  ]);

export default router;
