const Schema = require("mongoose").Schema;

let moduleSchema = new Schema ({
    title: String,
    id: Number,
    content: String,
    nextModuleId: Number,
    prevModuleId: Number
});

module.exports = db => (module.exports = db.model("Module", moduleSchema));