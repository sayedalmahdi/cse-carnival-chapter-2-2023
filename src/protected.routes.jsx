import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./utils/Spinner";
import { PROTECTED_ROUTES } from "./routes";

const ProtectedRoutes = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{PROTECTED_ROUTES.map((route, index) => (
					<Route key={index} path={route.path} Component={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};

export default ProtectedRoutes;
