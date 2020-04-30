const _ = require("lodash");
const async = require("async");
const Progress = require("../lib/db/Progress");
const Course = require("../lib/db/Course");

module.exports = (req, res) => {
	if (!req.isAuthed) {
		return res.status(401).json({ error: { message: "You must be signed in to view courses" } });
	}

	let courseId = parseInt(req.params.id);

	async.parallel({
		progress: cb => Progress // Populating course here would mean the DB needs to run an extra roundtrip step
			.findOne({ user: req.username, course: courseId })
			.lean()
			.exec(cb),
		course: cb => Course
			.findOne({ _id: courseId })
			.populate("lessons.modules", "_id title")
			.lean() // For JSON stringifying. Removes utility methods, so only use if you want to do that
			.exec(cb)
	}, (err, {progress, course}) => {
		if (err || !course || !progress) {
			console.log("Course error:", err);

			return res.status(500).json({ error: { message: "Failed to get course. Make sure you're enrolled in it and have access" } });
		}

		let quizResults = _.keyBy(progress.quizPerformance, "id");

		let ret = {
			name: course.name,
			id: course._id,
			goals: course.goals,
			status: progress.status
		};


		// Calculate stats
		let totalTime = 0;
		let completedTime = 0;

		let totalModules = 0;
		let completedModules = 0;

		ret.lessons = course.lessons.map(l => {
			let lData = {
				name: l.title,
				description: l.description,
				modules: []
			};

			let lessonCompleted = 0;

			lData.modules = l.modules.map(m => {
				totalModules++;

				// Hardcoded 7 minute-per-module time estimate
				totalTime += 7;

				let mData = {
					id: m._id,
					name: m.title,
					completed: quizResults.hasOwnProperty(m._id) || progress.completedModules.indexOf(m._id) !== -1,
					link: `/courses/${course._id}/modules/${m._id}`
				};

				if (quizResults.hasOwnProperty(m._id)) {
					mData.score = quizResults[m._id].score;
				}

				if (mData.completed) {
					lessonCompleted++;
					completedModules++;
					completedTime += 7;
				}
				else if (!ret.nextModule) {
					ret.nextModule = {
						id: m._id,
						name: m.title,
						lessonName: l.title,
						link: `/courses/${course._id}/modules/${m._id}`
					};
				}

				return mData;
			});

			if (lessonCompleted === 0) {
				lData.status = "new";
			}
			else if (lessonCompleted === lData.modules.length) {
				lData.status = "completed";
			}
			else {
				lData.status = "inprogress";
			}

			return lData;
		});

		ret.timeRemaining = Math.round(((totalTime - completedTime) / 60) * 10) / 10;
		ret.totalTime = Math.round((totalTime / 60) * 10) / 10;
		ret.progressPercentage = Math.round((completedModules / totalModules) * 100);

		if (!ret.nextModule) {
			ret.nextModule = {
				id: course.lessons[0].modules[0]._id,
				name: course.lessons[0].modules[0].title,
				lessonName: course.lessons[0].title,
				link: `/courses/${course._id}/modules/${course.lessons[0].modules[0]._id}`
			};
		}

		res.json(ret);
	});
};