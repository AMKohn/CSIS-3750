const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/main", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on("error", () => console.error("Mongoose connection error"));

exports.User = mongoose.model("User", { name: String });

exports.mongoose = mongoose;