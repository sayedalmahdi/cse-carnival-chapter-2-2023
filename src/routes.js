import React from "react";
import SignUpAsUser from "./pages/SignUpAsGuide";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./components/Login"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const SignUpTourist = React.lazy(() => import("./components/SignUpTourist"));
const SignUpAsGuide = React.lazy(() => import("./pages/SignUpAsGuide"));

export const PUBLIC_ROUTES = [
	{ path: "/", element: Home },
	{ path: "/login", element: Login },
	{ path: "/tourist/signup", element: SignUpTourist },
	{ path: "/signupAsGuide", element: SignUpAsGuide },
];

export const PROTECTED_ROUTES = [{ path: "/dashboard", element: Dashboard }];
