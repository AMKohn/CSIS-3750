const Auth = require("../lib/auth");

const User = require("../lib/db/User");

exports.getToken = (req, res) => {
	User.findOne({
		_id: req.params.username
	}, (err, user) => {
		if (err || !user) {
			res.status(404).json({
				error: "Failed to find user"
			});
		}
		else {
			res.json({
				token: Auth.createToken(user)
			});
		}
	});
};