import React from "react";
import {Link} from "react-router-dom";

export default function Course() {
	return (
		<main className={"course"}>
			<h1>Course</h1>
			<Link to="/module/1">Go to the module page</Link>
		</main>
	);
}
