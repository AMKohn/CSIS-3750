import React from "react";
import {
	Link
} from "react-router-dom";

import "./style.css";
import LoadingSpinner from "../LoadingSpinner";
import {AuthContext} from "../AuthProvider";

class CourseListing extends React.Component {
	STATUS_MAP = {
		new: "Not Started",
		inprogress: "In Progress",
		completed: "Completed"
	};

	constructor(props) {
		super(props);

		this.state = this.props.course;
	}

	render() {
		let c = this.state;

		return (
			<section className={"course " + c.status}>
				<h2>{c.name}</h2>
				<p className="subtitle">{this.STATUS_MAP[c.status]}</p>
				<p className="instructor">{c.instructor}</p>

				<div className="stats">
					<div>
						<b>{c.timeRemaining} / {c.totalTime}</b>
						<p>hours left</p>
					</div>

					<div>
						<b>{c.progressPercentage || 0}%</b>
						<p>complete</p>
					</div>

					<div>
						<b>{c.moduleCount}</b>
						<p>modules</p>
					</div>
				</div>

				<div className="buttons">
					<Link className="btn flat" to={"/courses/" + c.id}>Go to course</Link>
					{ c.status !== "completed" ? <Link className="btn flat blue" to={c.continueLink}>{c.status === "new" ? "Start" : "Continue"}</Link> : null }
				</div>
			</section>
		)
	}
}

export default class Dashboard extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			error: false
		};
	}

	updateFromApi() {
		this.setState({
			loaded: false,
			error: false
		});

		this.context.fetch("/api/dashboard")
			.then(res => res.json())
			.then(
				result => this.setState({ loaded: true, ...result }),
				error => this.setState({ loaded: true, error })
			)
	}

	componentDidMount() {
		this.updateFromApi();
	}
	
	render() {
		if (this.state.error) {
			return (
				<main className={"dashboard"}>
					<h1 className={"title"}>Error: {this.state.error.message}</h1>
				</main>
			);
		}
		else if (!this.state.loaded) {
			return (
				<main className={"dashboard loading"}>
					<LoadingSpinner />
				</main>
			)
		}

		return (
			<main className={"dashboard"}>
				<h1 className={"title"}>My Courses</h1>

				{this.state.courses.map(c => <CourseListing course={c} key={c.id} />)}
			</main>
		)
	}
}
