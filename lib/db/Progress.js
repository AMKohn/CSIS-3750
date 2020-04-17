const Schema = require("mongoose").Schema;


let progressSchema = new Schema ({
    user: { type: String, ref: "User", required: true },
    courseId: { type: Number, ref: "Course", required: true },
    status: String,
    completedModules: [{ type: Number, ref: "Module" }],
    quizPerformance: [{
        id: Number,
        score: Number
    }]
}, {
    collection: "progress"
});

module.exports = db => (module.exports = db.model("Progress", progressSchema));