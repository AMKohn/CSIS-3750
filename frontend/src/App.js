import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import Module from "./Module";
import Course from "./Course";
import Dashboard from "./Dashboard";

import "./App.css";

export default function App() {
	return (
		<Router>
			<header className="toolbar">
				<h1 className="page-title">Learning App</h1>
			</header>

			<Switch>
				<Route path="/course" component={Course} />
				<Route path="/module/:moduleId" component={Module} />
				<Route path="/" component={Dashboard} />
			</Switch>
		</Router>
	);
}
