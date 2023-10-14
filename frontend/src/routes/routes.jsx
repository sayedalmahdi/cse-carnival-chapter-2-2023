import { BrowserRouter, Routes, Route } from "react-router-dom"

import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ErrorPage from '../pages/ErrorPage';


function PageRoutes() {

    return (
        <div>
            {/* <RouterProvider router={routes} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <IndexPage />
                    } >
                        <Route path="/" element={<LoginPage />} />

                        <Route path="signup" element={<SignupPage />} />

                    </Route>

                    <Route path="/login" element={
                        <LoginPage />
                    } />


                    <Route path="/*" element={<ErrorPage />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoutes;