import React from "react";
import {Link} from "react-router-dom";

export default function Dashboard() {
	return (
		<main className={"dashboard"}>
			<h1>Dashboard</h1>
			<Link to="/course">Go to the course page</Link>
		</main>
	);
}
