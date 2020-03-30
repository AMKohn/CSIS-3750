import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
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

			<div className="sidenav">
				<NavLink to="/" exact>Home</NavLink>
				<NavLink to="/course">Courses</NavLink>
				<NavLink to="/module/0" isActive={(match, location) => location.pathname.slice(0, 7) === "/module"}>Module</NavLink>
			</div>

			<Switch>
				<Route path="/course" component={Course} />
				<Route path="/module/:moduleId" component={Module} />
				<Route path="/" component={Dashboard} />
			</Switch>
		</Router>
	);
}
