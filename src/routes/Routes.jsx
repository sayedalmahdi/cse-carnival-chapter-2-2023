import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Login from "../pages/Authentication/Login/Login";
import Error from "../pages/Error/Error";
import Consultants from "../pages/Consultants/Consultants";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<Error></Error>,
        element: <Main></Main>,
        children:[
            {
                path:"login",
                element: <Login></Login>
            },
            {
                path:"signup",
                element: <SignUp></SignUp>
            },
            {
                path: "consultants",
                element: <Consultants></Consultants>
            }
        ]
    },
    {
        path:"/dashboard",
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:"adminhome",
                element: <AdminHome></AdminHome>
            }
        ]
    }
]);
export default router;