import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";
import { ADMIN_ROUTES, GUIDE_ROUTES, TOURIST_ROUTES } from "./routes";

export const TouristRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{TOURIST_ROUTES.map((route, index) => (
					<Route key={index} path={route.path} Component={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};

export const GuideRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{GUIDE_ROUTES.map((route, index) => (
					<Route key={index} path={route.path} Component={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};

export const AdminRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{ADMIN_ROUTES.map((route, index) => (
					<Route key={index} path={route.path} Component={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};
