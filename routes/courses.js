const Course = require("../lib/db/Course");

module.exports = (req, res) => {
	if (req.isAuthed) {
		console.log("Got courses request for user", req.username);
	}

	// Simultaneously (the async library with async.parallel is awesome for this):
		// Get user
		// Load course
	// Populate modules using Mongoose .populate()
	// Compare user's completed module IDs with the course to calculate timeRemaining and progress

	let courseId = parseInt(req.params.id);

	Course.findOne({
		id: courseId
	}, (err, course) => {
		if (err || !course) {
			console.log("Failed to find course");
		}
		else {
			console.log("Found course " + course.name);
		}
	});

	res.json({
		name: "My Super Awesome Course " + courseId,
		id: courseId,

		// User-specific attributes
		status: "inprogress", // new/inprogress/completed
		progressPercentage: 87,
		timeRemaining: 2,
		totalTime: 10,
		nextModule: {
			id: 205,
			name: "Module 5",
			lessonName: "Lesson 2",
			link: `/courses/${courseId}/modules/205`
		},

		// Lessons
		lessons: [{
			id: 1,
			name: "Lesson 1",
			status: "completed",
			modules: [
				{ id: 101, name: "Module 1-1", completed: true, link: `/courses/${courseId}/modules/101` },
				{ id: 102, name: "Module 1-2", completed: true, link: `/courses/${courseId}/modules/102` },
				{ id: 103, name: "Module 1-3", completed: true, link: `/courses/${courseId}/modules/103` },
				{ id: 104, name: "Module 1-4", completed: true, link: `/courses/${courseId}/modules/104` },
				{ id: 105, name: "Module 1-5", completed: true, link: `/courses/${courseId}/modules/105` },
				{ id: 106, name: "Module 1-6", completed: true, link: `/courses/${courseId}/modules/106` },
				{ id: 107, name: "Module 1-7", completed: true, link: `/courses/${courseId}/modules/107` },
				{ id: 108, name: "Module 1-8", completed: true, link: `/courses/${courseId}/modules/108` },
				{ id: 109, name: "Module 1-9", completed: true, link: `/courses/${courseId}/modules/109` },
				{ id: 110, name: "Module 1-10", completed: true, link: `/courses/${courseId}/modules/110` }
			]
		}, {
			id: 2,
			name: "Lesson 2",
			status: "inprogress",
			modules: [
				{ id: 201, name: "Module 2-1", completed: true, link: `/courses/${courseId}/modules/201` },
				{ id: 202, name: "Module 2-2", completed: true, link: `/courses/${courseId}/modules/202` },
				{ id: 203, name: "Module 2-3", completed: true, link: `/courses/${courseId}/modules/203` },
				{ id: 204, name: "Module 2-4", completed: true, link: `/courses/${courseId}/modules/204` },
				{ id: 205, name: "Module 2-5", completed: false, link: `/courses/${courseId}/modules/205` },
				{ id: 206, name: "Module 2-6", completed: false, link: `/courses/${courseId}/modules/206` },
				{ id: 207, name: "Module 2-7", completed: false, link: `/courses/${courseId}/modules/207` },
				{ id: 208, name: "Module 2-8", completed: false, link: `/courses/${courseId}/modules/208` },
				{ id: 209, name: "Module 2-9", completed: false, link: `/courses/${courseId}/modules/209` },
				{ id: 210, name: "Module 2-10", completed: false, link: `/courses/${courseId}/modules/210` }
			]
		}, {
			id: 3,
			name: "Lesson 3",
			status: "new",
			modules: [
				{ id: 301, name: "Module 3-1", completed: false, link: `/courses/${courseId}/modules/301` },
				{ id: 302, name: "Module 3-2", completed: false, link: `/courses/${courseId}/modules/302` },
				{ id: 303, name: "Module 3-3", completed: false, link: `/courses/${courseId}/modules/303` },
				{ id: 304, name: "Module 3-4", completed: false, link: `/courses/${courseId}/modules/304` },
				{ id: 305, name: "Module 3-5", completed: false, link: `/courses/${courseId}/modules/305` },
				{ id: 306, name: "Module 3-6", completed: false, link: `/courses/${courseId}/modules/306` },
				{ id: 307, name: "Module 3-7", completed: false, link: `/courses/${courseId}/modules/307` },
				{ id: 308, name: "Module 3-8", completed: false, link: `/courses/${courseId}/modules/308` },
				{ id: 309, name: "Module 3-9", completed: false, link: `/courses/${courseId}/modules/309` },
				{ id: 310, name: "Module 3-10", completed: false, link: `/courses/${courseId}/modules/310` }
			]
		}, {
			id: 4,
			name: "Lesson 4",
			status: "new",
			modules: [
				{ id: 401, name: "Module 4-1", completed: false, link: `/courses/${courseId}/modules/401` },
				{ id: 402, name: "Module 4-2", completed: false, link: `/courses/${courseId}/modules/402` },
				{ id: 403, name: "Module 4-3", completed: false, link: `/courses/${courseId}/modules/403` },
				{ id: 404, name: "Module 4-4", completed: false, link: `/courses/${courseId}/modules/404` },
				{ id: 405, name: "Module 4-5", completed: false, link: `/courses/${courseId}/modules/405` },
				{ id: 406, name: "Module 4-6", completed: false, link: `/courses/${courseId}/modules/406` },
				{ id: 407, name: "Module 4-7", completed: false, link: `/courses/${courseId}/modules/407` },
				{ id: 408, name: "Module 4-8", completed: false, link: `/courses/${courseId}/modules/408` },
				{ id: 409, name: "Module 4-9", completed: false, link: `/courses/${courseId}/modules/409` },
				{ id: 410, name: "Module 4-10", completed: false, link: `/courses/${courseId}/modules/410` }
			]
		}]
	});
};