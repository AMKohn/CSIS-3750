import React from "react";
import {Link} from "react-router-dom";
import "./index.css";

export default function Course() {
	return (
		<main className={"course"}>
			<center>
				<h1>Course</h1>
				<Link to="/module">Go to the module page</Link>
			</center>
		</main>
	);
}
