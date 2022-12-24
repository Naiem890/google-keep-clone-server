const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const { PORT } = process.env;
const indexRouter = require("./routes/index");
const dbConnect = require("./config/database");

// Middleware Array
const middleware = [
	logger("dev"),
	cors(),
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
	cookieParser(),
];

app.use(middleware);
app.use(indexRouter);

dbConnect();

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
