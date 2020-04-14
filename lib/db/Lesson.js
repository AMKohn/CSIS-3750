const Schema = require("mongoose").Schema;



let lessonSchema = new Schema ({
    title: String,
    id: Number,
    description: String,
    modules: {
        id: Number,
        type: {
            type: String,
            enum: ["module", "quiz", "assignment"]
        }
    },
    nextLessonId: Number,
    prevLessonId: Number
});


module.exports = db => (module.exports = db.model("Lesson", lessonSchema));