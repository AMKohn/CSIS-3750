const Schema = require("mongoose").Schema;

let userSchema = new Schema({
	username: { type: String, maxlength: 250, required: true, unique: true },
	first: { type: String, maxlength: 50 },
	last: { type: String, maxlength: 50 },
	type: { type: String, enum: ["student", "instructor"] },
	courses: { type: [{
		_id: false,
		id: { type: Schema.Types.ObjectId, ref: "Course" },
		completedModules: [Number] // Should probably be switched out with another ref, like in Course
	}] }
});

module.exports = db => (module.exports = db.model("User", userSchema));