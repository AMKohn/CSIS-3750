const Schema = require("mongoose").Schema;

let courseSchema = new Schema({
	_id: Number,
	name: String,
	instructor: String,
	goals: [String],
	contents: [{
		type: {
			type: String,
			enum: ["lesson", "quiz"]
		},
		title: String,
		description: String,
		modules: [{ type: Number, ref: "Module" }]
	}]
});

module.exports = db => (module.exports = db.model("Course", courseSchema));