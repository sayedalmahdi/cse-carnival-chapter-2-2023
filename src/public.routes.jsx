import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";
import { PUBLIC_ROUTES } from "./routes";

const PublicRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{PUBLIC_ROUTES.map((route, index) => (
					<Route key={index} path={route.path} Component={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};

export default PublicRoutes;
