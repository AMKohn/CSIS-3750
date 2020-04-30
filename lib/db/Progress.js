const Schema = require("mongoose").Schema;


let progressSchema = new Schema ({
    user: { type: String, ref: "User", required: true, index: true },
    course: { type: Number, ref: "Course", required: true },
    status: {
        type: String,
        enum: ["new", "inprogress", "completed"]
    },
    completedModules: [{ type: Number, ref: "Module" }],
    quizPerformance: [{
        _id: false,
        id: Number,
        score: Number,
        time: Date
    }]
}, {
    collection: "progress"
});

module.exports = db => (module.exports = db.model("Progress", progressSchema));