exports.put = (req, res) => {
	res.json({
		score: 87
	});
};

exports.get = (req, res) => {
	let qId = parseInt(req.params.id);

	res.json({
		title: "Quiz " + qId,
		courseId: req.params.courseId,
		questions: [{
			type: "radio",
			id: "question1",
			title: "Question 1",
			options: [
				{ text: "Option 1", value: "1" },
				{ text: "Option 2", value: "2" },
				{ text: "Option 3", value: "3" },
				{ text: "Option 4", value: "4" }
			]
		}, {
			type: "checkbox",
			id: "question2",
			title: "Question 2",
			description: "Select all that apply",
			options: [
				{ text: "Option 1", value: "1" },
				{ text: "Option 2", value: "2" },
				{ text: "Option 3", value: "3" },
				{ text: "Option 4", value: "4" }
			]
		}, {
			type: "select",
			id: "question3",
			title: "Question 3",
			options: [
				{ text: "Option 1", value: "1" },
				{ text: "Option 2", value: "2" },
				{ text: "Option 3", value: "3" },
				{ text: "Option 4", value: "4" }
			]
		}]
	});
};