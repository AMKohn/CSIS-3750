const Schema = require("mongoose").Schema;

let courseSchema = new Schema({
	_id: Number,
	name: String,
	instructor: String,
	goals: [String],
	lessons: [{
		title: String,
		description: String,
		modules: [{ type: Number, ref: "Module" }]
	}]
});

module.exports = db => (module.exports = db.model("Course", courseSchema));