import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Login from "../pages/Authentication/Login/Login";
import Error from "../pages/Error/Error";
import Consultants from "../pages/Consultants/Consultants";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import ConsultantHome from "../pages/Dashboard/Consultant/ConsultantHome/ConsultantHome";
import MyServices from "../pages/Dashboard/Consultant/MyServices/MyServices";
import AddServices from "../pages/Dashboard/Consultant/AddServices/AddServices";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageServices from "../pages/Dashboard/Admin/ManageServices/ManageServices";
import CustomerHome from "../pages/Dashboard/Customer/CustomerHome/CustomerHome";
import FavouriteService from "../pages/Dashboard/Customer/FavouriteService/FavouriteService";
import Appointment from "../pages/Dashboard/Consultant/Appointment/Appointment";
import MyAppointment from "../pages/Dashboard/Customer/MyAppointment/MyAppointment";
import Payment from "../pages/Dashboard/Payment/Payment";
const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<Error></Error>,
        element: <Main></Main>,
        children:[
            {
                path: "/",
                element:<Home></Home>
            },
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
            },
            {
                path: "services",
                element: <Services></Services>
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
            },
            {
                path:"consultanthome",
                element: <ConsultantHome></ConsultantHome>
            },
            {
                path:"myservices",
                element: <MyServices></MyServices>
            },
            {
                path:"addservices",
                // path:"addservices/:email",
                element: <AddServices></AddServices>,
                // loader: ({params}) => fetch(`http://localhost:5000/consultantdetails/${params?.email}`)
            },
            {
                path:"manageusers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "manageServices",
                element: <ManageServices></ManageServices>
            },
            {
                path: "customerhome",
                element: <CustomerHome></CustomerHome>
            },
            {
                path: "favouriteservices",
                element: <FavouriteService></FavouriteService>
            },
            {
                path: "appointment",
                element: <Appointment></Appointment>
            },
            {
                path: "myAppointment",
                element: <MyAppointment></MyAppointment>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=>fetch(`http://localhost:5000/payment/${params.id}`)
            }
        ]
    }
]);
export default router;