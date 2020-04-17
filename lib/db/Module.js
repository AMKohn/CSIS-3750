const Schema = require("mongoose").Schema;

let moduleSchema = new Schema ({
    _id: Number,
    title: String,
    content: String,
    nextModuleId: Number,
    prevModuleId: Number
});

module.exports = db => (module.exports = db.model("Module", moduleSchema));