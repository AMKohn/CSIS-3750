const _ = require("lodash");

const Module = require("../lib/db/Module");
const Progress = require("../lib/db/Progress");

exports.put = (req, res) => {
	if (!req.isAuthed) {
		return res.status(401).json({ error: { message: "You must be signed in to submit quizzes" } });
	}

	if (!Array.isArray(req.body)) {
		return res.status(400).json({ error: { message: "Invalid submission" } });
	}

	let mId = parseInt(req.params.id);
	let cId = parseInt(req.params.courseId);

	Module.findOne({ _id: mId }).lean().exec((err, quiz) => {
		if (err || !quiz) {
			return res.status(500).json({ error: { message: "Failed to save quiz" } });
		}

		let points = 0;
		let totalPoints = 0;

		_.each(quiz.questions, (q, i) => {
			totalPoints += q.points;

			if (i < req.body.length) {
				// Checkbox answers come in as arrays
				if (Array.isArray(req.body[i])) {
					let numRight = 0;

					_.each(req.body[i], a => {
						if (q.answers.indexOf(a) !== -1) numRight++;
					});

					// Answers are each worth a fraction of the total points
					let pointValue = (1 / q.answers.length) * q.points;

					// Add right answers and subtract wrong ones
					let qPoints = numRight * pointValue - (req.body[i].length - numRight) * pointValue;

					// You can't lose points on an answer
					if (qPoints > 0) {
						points += qPoints;
					}
				}
				// There are sometimes multiple correct answers. If this was a single-choice answer, award full points
				else if (q.answers.indexOf(req.body[i]) !== -1) {
					points += q.points;
				}
			}
		});

		let score = Math.round((points / totalPoints) * 100);

		Progress.where({ user: req.username, course: cId }).update({
			$addToSet: {
				quizPerformance: {
					id: mId,
					score: score,
					time: new Date()
				}
			}
		}).exec(err => {
			if (err) {
				return res.status(500).json({ error: { message: "Failed to save quiz" } });
			}

			res.json({
				score: score
			});
		});
	});
};

exports.get = (req, res) => {
	if (!req.isAuthed) {
		return res.status(401).json({ error: { message: "You must be signed in to view quizzes" } });
	}

	let mId = parseInt(req.params.id);

	// There's no progress tracking needed here since quizzes can be retaken an unlimited number of times and answers aren't viewable
	Module.findOne({ _id: mId }).lean().exec((err, quiz) => {
		if (err || !quiz) {
			return res.status(500).json({ error: { message: "Failed to load quiz" } });
		}

		if (!quiz.quiz) {
			return res.status(400).json({ error: { message: "Modules can't be viewed from the quiz page" } });
		}

		res.json({
			courseId: parseInt(req.params.courseId),
			title: quiz.title,
			content: quiz.content,
			questions: quiz.questions.map(q => _.omit(q, "answers"))
		});
	});
};