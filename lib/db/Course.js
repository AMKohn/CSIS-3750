const Schema = require("mongoose").Schema;

let courseSchema = new Schema({
	name: { type: String, maxlength: 250 }
});

module.exports = db => (module.exports = db.model("Course", courseSchema));