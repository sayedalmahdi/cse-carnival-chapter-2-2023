import React from "react";

const Home = React.lazy(() => import("./pages/Home"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

export const PUBLIC_ROUTES = [{ path: "/", element: Home }];

export const PROTECTED_ROUTES = [{ path: "/dashboard", element: Dashboard }];
