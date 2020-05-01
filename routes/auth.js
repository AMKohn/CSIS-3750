const async = require("async");

const Auth = require("../lib/auth");
const User = require("../lib/db/User");
const Progress = require("../lib/db/Progress");

exports.getToken = (req, res) => {
	async.parallel({
		user: cb => User.findOne({ _id: req.params.username }).lean().exec(cb),
		courses: cb => Progress.find({ user: req.params.username }, { course: 1 }).lean().exec(cb)
	}, (err, { user, courses }) => {
		if (err || !user) {
			res.status(404).json({
				error: "Failed to find user"
			});
		}
		else {
			user.courses = (courses || []).map(e => e.course);

			res.json({
				token: Auth.createToken(user)
			});
		}
	});
};