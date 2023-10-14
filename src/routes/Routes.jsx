import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Login from "../pages/Authentication/Login/Login";
import Error from "../pages/Error/Error";
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
            }
        ]
    }
]);
export default router;