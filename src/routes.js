import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./components/Login"));
const Chat = React.lazy(() => import("./components/Chat"));
const Payment = React.lazy(() => import("./components/Payment"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const SignUpTourist = React.lazy(() => import("./components/SignUpTourist"));
const SignUpAsGuide = React.lazy(() => import("./pages/SignUpAsGuide"));
const GuideList = React.lazy(() => import("./pages/GuideList"));

export const PUBLIC_ROUTES = [
	{ path: "/", element: Home },
	{ path: "/login", element: Login },
	{ path: "/tourist/signup", element: SignUpTourist },
	{ path: "/signupAsGuide", element: SignUpAsGuide },
	{ path: "/tourist/guidelist", element: GuideList },
	{ path: "/chat", element: Chat },
	{ path: "/payment", element: Payment },
];

export const PROTECTED_ROUTES = [{ path: "/dashboard", element: Dashboard }];
