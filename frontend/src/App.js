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
			<Switch>
				<Route path="/course">
					<Course />
				</Route>
				<Route path="/module">
					<Module />
				</Route>
				<Route path="/">
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	);
}