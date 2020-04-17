import React from "react";
import {
	Link
} from "react-router-dom";

import { Checkbox, Radio, Select, MenuItem } from "@material-ui/core";

import "./style.css";
import LoadingSpinner from "../LoadingSpinner";
import {AuthContext} from "../AuthProvider";

class Question extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: ""
		};
	}

	setSelected(val) {
		// TODO: handle multiselect serialization
		this.setState({
			selectedValue: val
		});

		this.props.onChange(val);
	}

	getControl() {
		if (this.props.type === "checkbox" || this.props.type === "radio") {
			return (
				<div className={"option-list"}>
					{this.props.options.map(o =>
						<label className={this.state.checked === o.value ? "selected" : ""} key={o.value}>
							{this.props.type === "checkbox" ? (
								<Checkbox value={o.value} name={this.props.id} />
							) : (
								<Radio value={o.value} name={this.props.id} onChange={() => this.setSelected(o.value)} checked={this.state.selectedValue === o.value} />
							)}

							<span>{o.text}</span>
						</label>
					)}
				</div>
			)
		}
		else if (this.props.type === "select") {
			return (
				<Select
					name={this.props.id}
					className={"select"}
					value={this.state.selectedValue}
					onChange={(e) => this.setSelected(e.target.value)}
				>
					{this.props.options.map(o =>
						<MenuItem value={o.value} key={o.value}>{o.text}</MenuItem>
					)}
				</Select>
			)
		}

		return "";
	}

	render() {
		return (
			<div className={"question " + this.props.type}>
				<h3 className={"title"}>{this.props.title}</h3>

				{this.props.description &&
					<p className={"desc"}>{this.props.description}</p>
				}

				{this.getControl()}
			</div>
		)
	}
}

export default class Quiz extends React.Component {
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

		this.context.fetch("/api/courses/" + this.props.match.params.courseId + "/quizzes/" + this.props.match.params.quizId)
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
		if (prevProps.match.params.quizId !== this.props.match.params.quizId || prevProps.match.params.courseId !== this.props.match.params.courseId) {
			this.updateFromApi();
		}
	}

	handleChange(id, value) {
		// There's no need to trigger a state change since we don't use this
		this.state.questions.forEach(e => {
			if (e.id === id) {
				e.value = value;
			}
		});
	}

	submitQuiz() {
		let data = {};

		this.state.questions.forEach(e => data[e.id] = e.value);

		// TODO: PUT to the server endpoint and go back to course page
		console.log(data);

		this.props.history.push("/courses/" + this.state.courseId);
	}

	render() {
		if (this.state.error || !this.state.loaded) {
			return (
				<main className={"module quiz"}>
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
			<main className={"module quiz"}>
				<Link to={"/courses/" + cId}>Back to course</Link>

				<div className={"content"}>
					<h1 className={"title"}>{this.state.title}</h1>

					<div className={"questions"}>
						{this.state.questions.map(e => <Question key={e.id} onChange={value => this.handleChange(e.id, value)} {...e} />)}
					</div>

					<button className="btn blue submit" onClick={() => this.submitQuiz()}>Submit Quiz</button>
				</div>
			</main>
		)
	}
}
