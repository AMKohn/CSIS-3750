var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema ({
    instructor: Boolean,
    name: String,
    description: String,
    contents: [{
        type: {
            lesson: Boolean,
            quiz: Boolean
        },
        id: Number
    }]
});

var userSchema = new Schema ({
    name: String,
    id: Number,
    type: {
        student: Boolean,
        instructor: Boolean
        }
});

var lessonSchema = new Schema ({
    title: String,
    id: Number,
    description: String,
    modules: {
        id: Number,
        type: {
            module: Boolean,
            quiz: Boolean,
            assignment: Boolean
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
            multipleChoice: Boolean,
            checkbox: Boolean,
            textAnswer: Boolean,
            matching: Boolean
        },
        options:{
            required: Boolean,
            timeLimit: Number,
            notes: Boolean
        }
    }]
});