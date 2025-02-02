const _ = require("lodash");
const async = require("async");
const Module = require("../lib/db/Module");
const Progress = require("../lib/db/Progress");

module.exports = (req, res) => {
	if (!req.isAuthed) {
		return res.status(401).json({ error: { message: "You must be signed in to view modules" } });
	}

	let mId = parseInt(req.params.id);
	let cId = parseInt(req.params.courseId);

	if (req.userCourses.indexOf(cId) === -1) {
		return res.status(400).json({ error: { message: "You must be enrolled in the course to view this module" } });
	}

	async.parallel({
		progress: cb => Progress
			.findOneAndUpdate({
				user: req.username,
				course: cId
			}, {
				$addToSet: {
					completedModules: mId
				}
			}, {
				new: true
			})
			.populate("course")
			.exec(cb),
		module: cb => Module.findOne({ _id: mId }).lean().exec(cb)
	}, (err, { module, progress }) => {
		if (err || !module || !progress) {
			return res.status(500).json({ error: { message: "Failed to load module. Make sure you're enrolled in the course and have access" } });
		}

		let ret = {
			courseId: cId,
			title: module.title,
			content: module.quiz ?
				`<p><button type="button" onclick="navLinkClick('/courses/${req.params.courseId}/quizzes/${mId}')" class="btn blue" style="font-size: 16px;margin: 16px auto;padding: 16px 28px;">Take the quiz</button></p>` :
				module.content,
			nextModule: null,
			prevModule: null
		};

		let moduleList = _.flatMap(progress.course.lessons, l => l.modules);

		let idx = moduleList.indexOf(mId);

		// If this isn't the last item in the moduleList, set the next one
		if (idx !== -1 && idx < moduleList.length - 1) {
			ret.nextModule = `/courses/${req.params.courseId}/modules/${moduleList[idx + 1]}`;
		}

		// If this isn't the first item, set the previous one
		if (idx > 0) {
			ret.prevModule = `/courses/${req.params.courseId}/modules/${moduleList[idx - 1]}`;
		}

		res.json(ret);

		// Update the course status asynchronously if needed
		// Naively assumes all modules in the completedModules are valid IDs in the moduleList
		if (!module.quiz && (progress.status === "new" || (progress.status === "inprogress" && progress.completedModules.length === moduleList.length))) {
			progress.status = progress.completedModules.length === moduleList.length ? "completed" : "inprogress";
			progress.save(err => {
				if (err) console.log("Error updating progress status:", err);
			});
		}
	});
};