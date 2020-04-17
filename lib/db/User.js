const Schema = require("mongoose").Schema;

let userSchema = new Schema({
	_id: String, // The username, stored as the _id for easier lookups
	first: { type: String, maxlength: 50 },
	last: { type: String, maxlength: 50 },
	type: { type: String, enum: ["student", "instructor"] }
});

module.exports = db => (module.exports = db.model("User", userSchema));