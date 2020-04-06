import React from "react";

import "./style.css";
import LoadingSpinner from "../LoadingSpinner";
import {AuthContext} from "../AuthProvider";

export default class Login extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}

	login(user) {
		this.setState({
			loading: true
		});

		this.context.login(user);
	}

	render() {
		if (this.state.loading) {
			return (
				<div className={"login"}>
					<div className={"modal"}>
						<LoadingSpinner />
					</div>
				</div>
			)
		}

		let users = [
			["dsidious", "David"],
			["pamidala", "Piper"],
			["askywalker", "Alan"]
		];

		return (
			<div className={"login"}>
				<div className={"modal"}>
					<h2>Select a user to continue</h2>

					<div className={"users"}>
						{ users.map(e => <button className={"blue"} key={e[0]} onClick={() => this.login(e[0])}>{e[1]}</button>) }
					</div>

					<p>In a production app an enterprise authentication system like the WSO2 Identity Server used by NSU would handle authentication, so we don't need a username and password system.</p>
				</div>
			</div>
		)
	}
}
