const db = require("./lib/db");
const logger = require("morgan");
const express = require("express");

const indexRoute = require("./routes/index");

const app = express();

// Middleware: detailed logging, static resources, JSON and URL parsing and encoding
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", indexRoute);

// Listen on port 3100
db.mongoose.connection.once("open", () => {
	app.listen(3100, () => console.log("Listening on port 3100"));
});