module.exports = (req, res) => {
	if (req.isAuthed) {
		console.log("Got dashboard request for user", req.username);
	}

	// Get user from DB, use mongoose populate to load course info.
	// Sort by In Progress -> Not Started -> Completed

	res.json({
		courses: [{
			id: 1,
			name: "Intro to Python",
			instructor: "John Doe, PhD",
			status: "inprogress",

			timeRemaining: 2,
			totalTime: 10,
			progressPercentage: 20, // % of modules completed, not time remaining
			moduleCount: 37,
			continueLink: "/courses/1/modules/101"
		}, {
			id: 2,
			name: "Fundamentals of Computing II",
			instructor: "John Doe, PhD",
			status: "inprogress",

			timeRemaining: 6,
			totalTime: 14,
			progressPercentage: 43,
			moduleCount: 24,
			continueLink: "/courses/2/modules/213"
		}, {
			id: 3,
			name: "Advanced Python",
			instructor: "John Doe, PhD",
			status: "new",

			timeRemaining: 11,
			totalTime: 11,
			progressPercentage: 0,
			moduleCount: 33,
			continueLink: "/courses/3/modules/301"
		}, {
			id: 4,
			name: "React and Modern Web Frameworks",
			instructor: "John Doe, PhD",
			status: "new",

			timeRemaining: 7,
			totalTime: 7,
			progressPercentage: 0,
			moduleCount: 18,
			continueLink: "/courses/4/modules/401"
		}, {
			id: 5,
			name: "Web Development",
			instructor: "John Doe, PhD",
			status: "completed",

			timeRemaining: 0,
			totalTime: 9,
			progressPercentage: 100,
			moduleCount: 27
		}, {
			id: 6,
			name: "Fundamentals of Computing",
			instructor: "John Doe, PhD",
			status: "completed",

			timeRemaining: 0,
			totalTime: 16,
			progressPercentage: 100,
			moduleCount: 41
		}]
	});
};