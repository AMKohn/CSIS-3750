const jwt = require("jsonwebtoken");

const HMAC_KEY = "2=C~xJe@a>e@D4Q'J=ZA'PSS";

/**
 * Creates and returns a new auth token given a user object from the database
 *
 * @param   {Object}  user  A user object with `courses`
 * @return  {String}        A new auth token
 */
exports.createToken = function(user) {
	// Tokens expire after 24 hours
	let expiry = Math.round(new Date().getTime() / 1000) + 24 * 60 * 60;

	return jwt.sign({
		"iat": Math.round(new Date().getTime() / 1000),
		"exp": expiry,
		"sub": user._id,
		"f": user.first,
		"l": user.last,
		"t": user.type,
		"c": user.courses // Encoded in the token so routes can see if a user is in a course without a DB lookup
	}, HMAC_KEY);
};


/**
 * Extends an Express request adding isAuthed, username and token properties.
 *
 * This function accepts standard middleware parameters.
 */
exports.extendRequest = function(req, res, next) {
	req.isAuthed = false;

	if (req && req.headers && req.headers.authorization && req.headers.authorization.slice(0, 7).toLowerCase() === "bearer ") {
		let token = req.headers.authorization.slice(7);

		req.token = exports.verifyToken(token);

		req.username = req.token.sub;
		req.userCourses = req.token.c;

		// If the client sent a token and it's invalid, have the client sign out
		if (req.token === false) {
			return res.status(401).json({
				error: "invalid_token"
			});
		}
		else {
			req.isAuthed = true;
		}
	}

	next();
};


/**
 * Verifies and decodes an auth token
 *
 * @param   {String}  token   The token to decode
 * @return  {Object|Boolean}  A decrypted token, or false if the token wasn't valid
 */
exports.verifyToken = function(token) {
	try {
		return jwt.verify(token, HMAC_KEY, {
			algorithms: ["HS256"]
		});
	}
	catch (e) {
		return false;
	}
};