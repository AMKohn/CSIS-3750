const Schema = require("mongoose").Schema;

let quizSchema = new Schema ({
    questions:[{
        name: String,
        points: Number,
        description: String,
        type: {
            type: String,
            enum: ["multipleChoice", "checkBox", "textAnswer"]
        },
        options:{
            required: Boolean,
            timeLimit: Number,
            notes: Boolean
        }
    }]
});

module.exports = db => (module.exports = db.model("Quiz", quizSchema));
