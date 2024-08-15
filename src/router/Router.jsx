import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root/Root";
import ErrorElement from "../pages/errorElement/ErrorElement";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorElement></ErrorElement>,
    children:[
      {
          path:'/',
          element:<Home></Home>,     
      },
    ]
  }
  ]);

export default router;
