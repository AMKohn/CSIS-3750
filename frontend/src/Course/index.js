import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

class LessonListing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: this.props.completed
		};
	}

	getClassName() {
		let className = "lesson";

		if (this.props.completed) {
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
				<h3 className={"name"} onClick={() => this.setState({ collapsed: !this.state.collapsed })}>Lesson {this.props.id}</h3>

				<ul className={"module-list"}>
					<li className={this.props.id === 2 ? "completed" : ""}><Link to={"/module/1"}>Module 1</Link></li>
					<li className={this.props.id === 2 ? "completed" : ""}><Link to={"/module/2"}>Module 2</Link></li>
					<li className={this.props.id === 2 ? "completed" : ""}><Link to={"/module/3"}>Module 3</Link></li>
					<li className={this.props.id === 2 ? "completed" : ""}><Link to={"/module/4"}>Module 4</Link></li>
					<li><Link to={"/module/5"}>Module 5</Link></li>
					<li><Link to={"/module/6"}>Module 6</Link></li>
					<li><Link to={"/module/7"}>Module 7</Link></li>
					<li><Link to={"/module/8"}>Module 8</Link></li>
					<li><Link to={"/module/9"}>Module 9</Link></li>
					<li><Link to={"/module/10"}>Module 10</Link></li>
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

	render() {
		return (
			<main className={"course"}>
				<h1 className={"title"}>My Super Awesome Course Name</h1>

				<div className={"continue"}>
					<h2>Continue with Lesson 3, Module 2</h2>

					<Link to={"/module/2"} className={"btn"}>Continue</Link>
				</div>

				<div className={"contents"}>
					<LessonListing id={1} completed={true} />
					<LessonListing id={2} completed={false} />
					<LessonListing id={3} completed={false} />
					<LessonListing id={4} completed={false} />
				</div>

				<div className={"sidebar"}>
					<ul>
						<li><h4>Status</h4> In progress</li>
						<li><h4>Progress</h4> 87% complete</li>
						<li><h4>Lessons completed</h4> 9 of 12</li>
						<li><h4>Time remaining</h4> 2 / 10 hours</li>
					</ul>
				</div>
			</main>
		);
	}
}
