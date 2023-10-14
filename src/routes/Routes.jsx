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
            }
        ]
    }
]);
export default router;