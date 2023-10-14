import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./components/Login"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const SignUpTourist = React.lazy(() => import("./components/SignUpTourist"));

export const PUBLIC_ROUTES = [
  { path: "/", element: Home },
  { path: "/login", element: Login },
  { path: "/tourist/signup", element: SignUpTourist },
];

export const PROTECTED_ROUTES = [{ path: "/dashboard", element: Dashboard }];
