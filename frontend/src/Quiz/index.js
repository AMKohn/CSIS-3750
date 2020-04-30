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
			selectedValue: this.props.type === "checkbox" ? [] : ""
		};
	}

	setSelected(val) {
		if (this.props.type === "checkbox") {
			if (this.state.selectedValue.indexOf(val) !== -1) {
				let currVal = this.state.selectedValue.slice(0);

				currVal.splice(this.state.selectedValue.indexOf(val), 1);

				this.setState({
					selectedValue: currVal
				});

				this.props.onChange(currVal);
			}
			else {
				this.setState({
					selectedValue: this.state.selectedValue.concat(val)
				});

				this.props.onChange(this.state.selectedValue.concat(val));
			}
		}
		else {
			this.setState({
				selectedValue: val
			});

			this.props.onChange(val);
		}
	}

	getControl() {
		if (this.props.type === "checkbox" || this.props.type === "radio") {
			return (
				<div className={"option-list"}>
					{this.props.options.map(o =>
						<label className={this.state.checked === o.value ? "selected" : ""} key={o.value}>
							{this.props.type === "checkbox" ? (
								<Checkbox value={o.value} name={this.props.id} onChange={() => this.setSelected(o.value)} checked={this.state.selectedValue.indexOf(o.value) !== -1} />
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

	handleChange(index, value) {
		// There's no need to trigger a state change since we don't use this
		this.state.questions[index].value = value;
	}

	submitQuiz() {
		let data = [];

		for (let i = 0; i < this.state.questions.length; i++) {
			if (this.state.questions[i].hasOwnProperty("value")) {
				data.push(this.state.questions[i].value);
			}
			else {
				alert("Error: all questions are required");
				return;
			}
		}

		this.context.fetch("/api/courses/" + this.props.match.params.courseId + "/quizzes/" + this.props.match.params.quizId, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			.then(
				() => this.props.history.push("/courses/" + this.state.courseId),
				error => alert("Something went wrong while trying to submit the quiz. Please try again")
			);
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
						{this.state.questions.map((e, i) => <Question key={i} onChange={value => this.handleChange(i, value)} id={"question" + i} {...e} />)}
					</div>

					<button className="btn blue submit" onClick={() => this.submitQuiz()}>Submit Quiz</button>
				</div>
			</main>
		)
	}
}
