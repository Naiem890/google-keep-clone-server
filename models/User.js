const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		avatar: {
			type: String,
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
