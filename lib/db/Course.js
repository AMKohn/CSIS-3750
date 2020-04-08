const Schema = require("mongoose").Schema;

let courseSchema = new Schema({
	name: { type: String, maxlength: 250 },

	// Need to make a Module model and ref it like this so we can use Mongoose.populate()
	// lessons: { type: [{
	// 	_id: false,
	// 	modules: [{ type: Schema.Types.ObjectId, ref: "Module" }]
	// }] }
});

module.exports = db => (module.exports = db.model("Course", courseSchema));