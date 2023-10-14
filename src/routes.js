import React from "react";
import SignUpAsUser from "./pages/SignUpAsGuide";

const Home = React.lazy(() => import("./pages/Home"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const SignUp = React.lazy(() => import("./pages/SignUpAsTourist"));

export const PUBLIC_ROUTES = [
	{ path: "/", element: Home },
	{ path: "/signupAsGuide", element: SignUpAsGuide },
    { path: "/signupAsTourist", element: SignUpAsTourist}
];

export const PROTECTED_ROUTES = [{ path: "/dashboard", element: Dashboard }];
