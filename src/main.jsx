import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.sass";
import { StateProvider } from "./state/StateProvider";
import reducer, { initialState } from "./state/Reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<Router>
				<App />
			</Router>
		</StateProvider>
	</React.StrictMode>
);
