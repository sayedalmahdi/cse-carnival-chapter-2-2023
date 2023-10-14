import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFound/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'forgetpassword',
                element: <ForgetPassword/>
            },
            {
                path: '/',
                element: <Home/>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard/>
    }
]);

export default router;