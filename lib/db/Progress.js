const Schema = require("mongoose").Schema;


let progressSchema = new Schema ({
    userId: Number,
    courseId: Number,
    status: String,
    completedModules: [{
        id: Number
    }],
    quizPerformance:{
        id: Number,
        score: Number
    }
});

module.exports = db => (module.exports = db.model("Progress", progressSchema));