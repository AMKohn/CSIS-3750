import React from "react";
import ReactDOM from "react-dom";

import AuthProvider from "./AuthProvider";

import App from "./App";
import Login from "./Login";

import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider authedApp={App} unauthedApp={Login} />
	</React.StrictMode>,
	document.getElementById("root")
);
