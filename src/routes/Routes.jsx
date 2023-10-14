import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignUp from "../pages/Authentication/SignUp/SignUP";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"signup",
                element: <SignUp></SignUp>
            }
        ]
    }
]);
export default router;