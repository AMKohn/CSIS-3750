import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route, Link
} from "react-router-dom";

import Module from "./Module";
import Course from "./Course";
import Dashboard from "./Dashboard";

import "./App.css";

export default function App() {
	return (
		<Router>
			<header className="toolbar">
				<h1 className="page-title">LearningApp</h1>
			</header>
			<div className="sidenav">
				<Link to="/dashboard">Home</Link>
				<Link to="/Course">Courses</Link>
				<Link to="/Module">Module</Link>
			</div>

			<Switch>
				<Route path="/course">
					<Course />
				</Route>
				<Route path="/module">
					<Module />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	);
}
