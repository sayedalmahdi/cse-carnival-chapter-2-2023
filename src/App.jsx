import { useState, useEffect } from "react";
import "./App.sass";
import Layout from "./components/Layout";
import Spinner from "./utils/Spinner";
import ProtectedRoutes from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useStateValue } from "./state/StateProvider";
import { SET_USER } from "./state/Constants";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PROTECTED_ROUTES } from "./routes";
import { signOut } from "firebase/auth";

function App() {
	const [loading, setLoading] = useState(true);
	const [{ user }, action] = useStateValue();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		auth.onAuthStateChanged(async (userCredenetials) => {
			if (userCredenetials) {
				setLoading(true);
				const userData = (await getDoc(doc(db, "users", userCredenetials.uid))).data();
				action({ type: SET_USER, payload: { user: userData } });
				if (location.pathname === "/login" || location.pathname === "/") {
					if (userData.role === "guide") navigate("/chat");
					else if (userData.role === "tourist") navigate("/guides");
				}
			} else {
				action({ type: SET_USER, payload: { user: null } });
				PROTECTED_ROUTES.forEach((route) => {
					if (route.path === location.pathname) navigate("/");
				});
			}
			setLoading(false);
		});
	}, []);

	console.log("user", user);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : (
				<>
					{user && <ProtectedRoutes />}
					<PublicRoutes />
				</>
			)}
		</Layout>
	);
}

export default App;
