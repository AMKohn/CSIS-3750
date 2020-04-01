const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://service:yK1tFxC4jdqDI0x7@cluster0-hbj8q.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on("error", () => console.error("Mongoose connection error"));

exports.User = mongoose.model("User", { name: String });

const db = mongoose.connection.useDb("main");

require("./Course")(db);

exports.mongoose = mongoose;