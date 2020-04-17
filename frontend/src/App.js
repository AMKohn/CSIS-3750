import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";

import Quiz from "./Quiz";
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
				<NavLink to="/courses/0" exact>Courses</NavLink>
				<NavLink to="/courses/0/modules/205" isActive={(match, location) => location.pathname.split("/")[3] === "modules"}>Module</NavLink>
			</div>

			<Switch>
				<Route path="/courses/:courseId/quizzes/:quizId" component={Quiz} />
				<Route path="/courses/:courseId/modules/:moduleId" component={Module} />
				<Route path="/courses/:courseId" component={Course} />
				<Route path="/" component={Dashboard} />
			</Switch>
		</Router>
	);
}
