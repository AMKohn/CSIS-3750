const db = require("./lib/db");
const path = require("path");
const logger = require("morgan");
const express = require("express");

const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "hbs");

// Middleware: detailed logging, static resources, JSON and URL parsing and encoding
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routers, specific routes are defined in these files
app.use("/", indexRouter);

// Listen on port 3000
db.mongoose.connection.once("open", () => {
	app.listen(3000, () => console.log("Listening on port 3000"));
});