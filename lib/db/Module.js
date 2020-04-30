const Schema = require("mongoose").Schema;

let moduleSchema = new Schema ({
    _id: Number,
    title: String,
    content: String,
    quiz: Boolean,
    questions: [{
        type: {
            type: String,
            enum: ["radio", "checkbox", "select"]
        },
        title: String,
        description: String,
        points: Number,
        answers: [String],
        options: [{
            text: String,
            value: String,
        }]
    }]
});

module.exports = db => (module.exports = db.model("Module", moduleSchema));