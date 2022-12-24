const mongoose = require("mongoose");

function dbConnect() {
	const { DB_URI_CLOUD, DB_URI_LOCAL, NODE_ENV } = process.env;
	const dbUrl = NODE_ENV === "production" ? DB_URI_CLOUD : DB_URI_LOCAL;

	mongoose
		.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
		.then(() => {
			console.log("Database connected");
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = dbConnect;