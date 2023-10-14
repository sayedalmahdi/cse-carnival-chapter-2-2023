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

function App() {
	const [loading, setLoading] = useState(true);
	const [{ user }, action] = useStateValue();
	const navigate = useNavigate();

	useEffect(() => {
		auth.onAuthStateChanged(async (userCredenetials) => {
			if (userCredenetials && userCredenetials.emailVerified) {
				setLoading(true);
				const userData = (await getDoc(doc(db, "users", userCredenetials.uid))).data();

				console.log(userData);

				action({ type: SET_USER, payload: { user: userData } });
				navigate("/dashboard");
			} else {
				console.log(location.pathname);
				action({ type: SET_USER, payload: { user: null } });
				navigate("/");
			}
			setLoading(false);
		});
	}, []);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : (
				<>
					{true && <ProtectedRoutes />}
					<PublicRoutes />
				</>
			)}
		</Layout>
	);
}

export default App;
