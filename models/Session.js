const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		sessionUUID: {
			type: String,
			required: true,
		},
		expireDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Session = model("Session", sessionSchema);

module.exports = Session;
