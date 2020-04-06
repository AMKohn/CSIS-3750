const Schema = require("mongoose").Schema;

let userSchema = new Schema({
	username: { type: String, maxlength: 250, required: true, unique: true },
	first: { type: String, maxlength: 50 },
	last: { type: String, maxlength: 50 },
	type: { type: String, enum: ["student", "instructor"] },
	courses: { type: [{
		_id: false,
		id: { type: Schema.Types.ObjectId, ref: "Course" },
		completedModules: [Number]
	}] }
});

module.exports = db => (module.exports = db.model("User", userSchema));