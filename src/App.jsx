import { useState, useEffect } from "react";
import "./App.sass";
import Layout from "./components/Layout";
import Spinner from "./utils/Spinner";
import { AdminRoutes, GuideRoutes, TouristRoutes } from "./protected.routes";
import PublicRoutes from "./public.routes";
import { useStateValue } from "./state/StateProvider";
import { SET_USER } from "./state/Constants";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes";
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
				const snapshot = await getDoc(doc(db, "users", userCredenetials.uid));
				const userData = { id: snapshot.id, ...snapshot.data() };
				action({ type: SET_USER, payload: { user: userData } });
				PUBLIC_ROUTES.forEach((route) => {
					if (route.path === location.pathname) {
						switch (userData.role) {
							case "tourist":
								navigate("/tourist/guides");
								break;
							case "guide":
								navigate("/guide/chat");
								break;
							case "admin":
								navigate("/admin");
								break;
							default:
								navigate("/");
								break;
						}
					}
				});
			} else {
				action({ type: SET_USER, payload: { user: null } });
				let flag = false
				PUBLIC_ROUTES.forEach((route) => {
					if (route.path === location.pathname) flag = true
				});
				if (!flag) navigate("/");
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
					{user && user.role === "guide" && <GuideRoutes />}
					{user && user.role === "tourist" && <TouristRoutes />}
					{user && user.role === "admin" && <AdminRoutes />}
					<PublicRoutes />
				</>
			)}
		</Layout>
	);
}

export default App;
