import React from "react";

const AuthContext = React.createContext({});

export {AuthContext};

export default class AuthProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: null
		};
	}

	get hasToken() {
		return this.state.token !== null &&
			this.state.token.hasOwnProperty("jwt") &&
			typeof this.state.token.jwt === "string" &&
			this.state.token.hasOwnProperty("expiry") &&
			new Date().getTime() < this.state.token.expiry;
	}

	get user() {
		return this.state.token && this.state.token.user;
	}

	logout() {
		this.setState({ token: null });
	}

	login(username, cb = () => {}) {
		fetch("/api/getToken/" + username)
			.then(res => res.json())
			.then(data => {
				if (!data.token) {
					return cb(true);
				}

				// Tokens are unencrypted JWTs
				let payload = JSON.parse(atob(data.token.split(".")[1]));

				this.setState({
					token: {
						jwt: data.token,
						user: {
							id: payload.sub,
							first: payload.f,
							last: payload.l,
							type: payload.t
						},
						expiry: payload.exp * 1000
					}
				});
			})
			.catch(err => cb(err));
	}

	fetch(url, options = { method: "GET" }) {
		if (!this.hasToken) {
			this.logout();

			// fetch returns a Promise. To maintain compatibility, make one and reject it with an auth error immediately
			return new Promise((res, rej) => rej("Auth error"));
		}

		options.headers = options.headers || {};

		options.headers.Authorization = "Bearer " + this.state.token.jwt;

		let f = fetch(url, options);

		f.then(resp => {
			// If we get a 401, we have a bad token
			if (resp.status === 401) {
				this.logout();
			}
		});

		return f;
	}

	render() {
		// Changing this re-renders everything below the context. That means that changing the token
		// re-renders the entire app, which is costly. Avoid it.
		let contextValue = {
			token: this.state.token,

			fetch: (url, options) => this.fetch(url, options),
			login: (username, cb) => this.login(username, cb)
		};

		return (
			<AuthContext.Provider value={contextValue}>
				{this.hasToken ? <this.props.authedApp /> : <this.props.unauthedApp />}
			</AuthContext.Provider>
		)
	}
}