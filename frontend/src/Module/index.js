import React from "react";
import {
	Link
} from "react-router-dom";

import "./style.css";
import LoadingSpinner from "../LoadingSpinner";

export default class Module extends React.Component {
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

	componentDidUpdate(prevProps) {
		// If the module changed, update from the API
		if (prevProps.match.params.moduleId !== this.props.match.params.moduleId || prevProps.match.params.courseId !== this.props.match.params.courseId) {
			this.updateFromApi();
		}
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
			<main className={"module"}>
				<Link to={"/courses/" + cId}>Back to course</Link>

				<div className={"content"}>
					<h1>{this.state.title}</h1>

					<div className={"module-content"} dangerouslySetInnerHTML={{ __html: this.state.content }} />

					<div className={"nav-buttons"}>
						{this.state.prevModule != null && (<Link to={this.state.prevModule} className={"prev"}>Previous Module</Link>) }
						{this.state.nextModule != null && (<Link to={this.state.nextModule} className={"next"}>Next Module</Link>) }
					</div>
				</div>
			</main>
		)
	}
}
