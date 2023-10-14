// here a signup page would be created
import React from "react";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = getAuth(app);
	const handleSignup = () => {
		createUserWithEmailAndPassword(auth, email, password).then((value) =>
			alert("success")
		);
	};
	const handleGoogleSignup = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				const user = result.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	return (
		<div className="flex flex-col gap-12">
			<h1>Signup</h1>
			<div className="flex flex-col w-80 gap-5">
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button onClick={handleSignup}>Signup</button>
			<button>Sign in with Google</button>
		</div>
	);
};

export default Signup;
