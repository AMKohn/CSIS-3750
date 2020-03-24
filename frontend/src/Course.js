import React from "react";
import {Link} from "react-router-dom";

export default function Course() {
	return (
		<div className={"course"}>
			<h1>Course</h1>
			<Link to="/module">Go to the module page</Link>
		</div>
	);
}
