var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema ({
    instructor: Boolean,
    name: String,
    description: String,
    contents: [{
        type: {
            type: String,
            enum: ["lesson", "quiz"]
        },
        id: Number
    }]
});

var userSchema = new Schema ({
    name: String,
    id: Number,
    type: {
        type: String,
        enum: ["student", "instructor"]
    }
});

var lessonSchema = new Schema ({
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

var progressSchema = new Schema ({
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

var moduleSchema = new Schema ({
    title: String,
    id: Number,
    content: String,
    nextModuleId: Number,
    prevModuleId: Number
});

var quizSchema = new Schema ({
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