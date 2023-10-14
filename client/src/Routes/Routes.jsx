import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import Home from "../pages/Home/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import DashboardMenu from "../pages/Dashboard/DashboardMenu/DashboardMenu";
import Profile from "../pages/Dashboard/Profile/Profile";
import Appointment from "../pages/Dashboard/Appointment/Appointment";
import Payment from "../pages/Dashboard/Payment/Payment";
import Settings from "../pages/Dashboard/Settings/Settings";
import SetAppointment from "../pages/Dashboard/SetAppointment/SetAppointment";
import Consultant from "../pages/Dashboard/Consultant/Consultant";
import Consultee from "../pages/Dashboard/Consultee/Consultee";

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
        path: 'dashboardMenu',
        element: <DashboardMenu/>,
        children: [
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'appointment',
                element: <Appointment/>
            },
            {
                path: 'payment',
                element: <Payment/>
            },
            {
                path: 'settings',
                element: <Settings/>
            },
            {
                path: 'setAppointment',
                element: <SetAppointment/>
            },
            {
                path: 'consultant',
                element: <Consultant/>
            },
            {
                path: 'consultee',
                element: <Consultee/>
            },
        ]
    }
]);

export default router;