import React from "react";
import {Link} from "react-router-dom";
import "./style.css";
import LoadingSpinner from "../LoadingSpinner";

class LessonListing extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.props.lesson;

		if (this.state.status === "completed") {
			this.state.collapsed = true;
		}
	}

	getClassName() {
		let className = "lesson";

		if (this.state.status === "completed") {
			className += " completed";
		}

		if (this.state.collapsed) {
			className += " collapsed";
		}

		return className;
	}

	render() {
		return (
			<div className={this.getClassName()}>
				<h3 className={"name"} onClick={() => this.setState({ collapsed: !this.state.collapsed })}>{this.state.name}</h3>

				<ul className={"module-list"}>
					{this.state.modules.map(m =>
						<li className={m.completed ? "completed" : ""} key={m.id}>
							<Link to={m.link}>{m.name}</Link>
						</li>
					)}
				</ul>
			</div>
		)
	}
}

export default class Course extends React.Component {
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

		fetch("/api/courses/" + this.props.match.params.courseId)
			.then(res => res.json())
			.then(
				result => this.setState({ loaded: true, ...result }),
				error => this.setState({ loaded: true, error })
			)
	}

	componentDidMount() {
		this.updateFromApi();
	}

	componentDidUpdate(prevProps) {
		// If the course changed, update from the API
		if (prevProps.match.params.courseId !== this.props.match.params.courseId) {
			this.updateFromApi();
		}
	}

	getStatus() {
		switch (this.state.status) {
			case "inprogress":
				return "In progress";
			case "completed":
				return "Completed";
			default:
				return "Not started";
		}
	}

	render() {
		if (this.state.error) {
			return (
				<main className={"course"}>
					<h1 className={"title"}>Error: {this.state.error.message}</h1>
				</main>
			);
		}
		else if (!this.state.loaded) {
			return (
				<main className={"course"}>
					<h1 className={"title"}>Loading course...</h1>

					<LoadingSpinner />
				</main>
			)
		}

		let c = this.state;

		return (
			<main className={"course"}>
				<h1 className={"title"}>{c.name}</h1>

				{ c.hasOwnProperty("nextModule") &&
					<div className={"continue"}>
						<h2>Continue with {c.nextModule.lessonName}, {c.nextModule.name}</h2>

						<Link to={c.nextModule.link} className={"btn"}>Continue</Link>
					</div>
				}

				<div className={"contents"}>
					{c.lessons.map(l => <LessonListing lesson={l} key={l.id} courseId={this.state.id} />)}
				</div>

				<div className={"sidebar"}>
					<ul>
						<li><h4>Status</h4> {this.getStatus()}</li>
						<li><h4>Progress</h4> {c.progressPercentage || 0}% complete</li>
						<li><h4>Lessons completed</h4> {c.lessons.filter(l => l.status === "completed").length} of {c.lessons.length}</li>
						<li><h4>Time remaining</h4> {c.timeRemaining} / {c.totalTime} hours</li>
					</ul>
				</div>
			</main>
		);
	}
}
