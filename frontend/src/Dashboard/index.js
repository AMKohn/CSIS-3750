import React from "react";
import {
	Link
} from "react-router-dom";

import "./style.css";
import LoadingSpinner from "../LoadingSpinner";

export default class Dashboard extends React.Component {
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

		fetch("/api/courses/" + this.props.match.params.courseId + "/modules/" + this.props.match.params.moduleId)
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
		if (this.state.error || !this.state.loaded) {
			return (
				<main className={"module"}>
					<Link to={"/courses/" + this.props.match.params.courseId}>Back to course</Link>

					<div className={"content"}>
						{this.state.error ? (
							<h1 style={{marginBottom: 0}}>Error: {this.state.error.message}</h1>
						) : (
							<LoadingSpinner />
						)}
					</div>
				</main>
			)
		}

		let cId = this.state.courseId;

		return (
			<main className={"dashboard"}>
				<section className="course in-progress">
					<h2>Intro to Python</h2>
					<p className="subtitle">In progress</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>2 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>87%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
						<a className="btn flat blue" href="/courses/0/modules/205">Continue</a>
					</div>
				</section>
				
				<section className="course in-progress">
					<h2>Fundamentals of Computing II</h2>
					<p className="subtitle">In progress</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>2 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>87%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
						<a className="btn flat blue" href="/courses/0/modules/205">Continue</a>
					</div>
				</section>
				
				<section className="course new">
					<h2>Advanced Python</h2>
					<p className="subtitle">Not started</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>10 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>0%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
						<a className="btn flat blue" href="/courses/0/modules/205">Start</a>
					</div>
				</section>
				
				<section className="course new">
					<h2>React and Modern Web Frameworks</h2>
					<p className="subtitle">Not started</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>10 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>0%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
						<a className="btn flat blue" href="/courses/0/modules/205">Start</a>
					</div>
				</section>
				
				<section className="course completed">
					<h2>Web Development</h2>
					<p className="subtitle">Completed</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>0 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>100%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
					</div>
				</section>
				
				<section className="course completed">
					<h2>Fundamentals of Computing</h2>
					<p className="subtitle">Completed</p>
					<p className="instructor">John Doe, PhD</p>
				
					<div className="stats">
						<div>
							<b>0 / 10</b>
							<p>hours left</p>
						</div>
				
						<div>
							<b>100%</b>
							<p>complete</p>
						</div>
				
						<div>
							<b>37</b>
							<p>modules</p>
						</div>
					</div>
				
					<div className="buttons">
						<a className="btn flat" href="/courses/0">Go to course</a>
					</div>
				</section>
			</main>
		)
	}
}