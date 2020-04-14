const Schema = require("mongoose").Schema;

let courseSchema = new Schema({
	name: { type: String, maxlength: 250 },
	instructor: Boolean,
	description: String,
	contents: [{
		type: {
			type: String,
			enum: ["lesson", "quiz"]
		},
		id: Number
	}]
});

module.exports = db => (module.exports = db.model("Course", courseSchema));