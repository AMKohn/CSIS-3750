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

		fetch("/api/modules/" + this.props.match.params.moduleId)
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
		if (prevProps.match.params.moduleId !== this.props.match.params.moduleId) {
			this.updateFromApi();
		}
	}

	render() {
		if (this.state.error || !this.state.loaded) {
			return (
				<main className={"module"}>
					<Link to="/course">Back to course</Link>

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

		return (
			<main className={"module"}>
				<Link to="/course">Back to course</Link>

				<div className={"content"}>
					<h1>{this.state.title}</h1>

					<div className={"module-content"} dangerouslySetInnerHTML={{ __html: this.state.content }} />

					<div className={"nav-buttons"}>
						{this.state.prevModuleId != null && (<Link to={"/module/" + this.state.prevModuleId} className={"prev"}>Previous Module</Link>) }
						{this.state.nextModuleId != null && (<Link to={"/module/" + this.state.nextModuleId} className={"next"}>Next Module</Link>) }
					</div>
				</div>
			</main>
		)
	}
}
