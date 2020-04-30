const Progress = require("../lib/db/Progress");

module.exports = (req, res) => {
	if (!req.isAuthed) {
		return res.status(401).json({ error: { message: "You must be signed in to view the dashboard" } });
	}

	Progress
		.find({ user: req.username })
		.sort({ status: -1 })
		.populate("course")
		.lean()
		.exec((err, progress) => {
			progress = progress || [];

			if (err) {
				return res.status(500).json({ error: { message: "Failed to get courses" } });
			}

			let courses = [];

			progress.forEach(p => {
				let ret = {
					id: p.course._id,
					name: p.course.name,
					instructor: p.course.instructor,
					status: p.status
				};

				let totalTime = 0;
				let completedTime = 0;

				let totalModules = 0;
				let completedModules = 0;

				p.course.lessons.forEach(l => l.modules.forEach(m => {
					totalModules++;

					// Hardcoded 7 minute-per-module time estimate
					totalTime += 7;

					if (p.completedModules.indexOf(m) !== -1) {
						completedModules++;
						completedTime += 7;
					}
					else if (!ret.continueLink) {
						ret.continueLink = `/courses/${p.course._id}/modules/${m}`
					}
				}));

				ret.timeRemaining = Math.round((totalTime - completedTime) / 60);
				ret.totalTime = Math.round(totalTime / 60);
				ret.progressPercentage = Math.round((completedModules / totalModules) * 100);
				ret.moduleCount = totalModules;

				if (!ret.continueLink) {
					ret.continueLink = `/courses/${p.course._id}/modules/${p.course.lessons[0].modules[0]}`;
				}

				if (ret.status === "inprogress") {
					courses.unshift(ret);
				}
				else {
					courses.push(ret);
				}
			});

			res.json({ courses });
		});
};