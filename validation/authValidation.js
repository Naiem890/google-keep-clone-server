const bcrypt = require("bcrypt");
const User = require("../models/User");
const { isValidEmail, usernameGenerating } = require("../utils/helper");

exports.signupValidation = async (req, res, next) => {
	try {
		let { fullName, email, password } = req.body;
		const error = {};
		let fullNameValid, emailValid, passwordValid;
		if (fullName) {
			const letters = /^[A-Za-z\s]+$/; // Name char validation
			req.body.fullName = String(fullName).replace(/  +/g, " ").trim();
			if (req.body.fullName.match(letters)) {
				fullNameValid = true;
			} else {
				error.fullName = "Invalid Full Name";
			}
		} else {
			error.fullName = "Full Name is required";
		}

		if (email) {
			if (isValidEmail(email)) {
				const emailExists = await User.exists({ email });
				if (!emailExists) {
					emailValid = true;
					req.body.username = await usernameGenerating(email);
				} else {
					error.email =
						"An account is already associated with this email";
				}
			} else {
				error.email = "Invalid Email address!";
			}
		} else {
			error.email = "Email is required!";
		}

		if (password) {
			if (password.length >= 8 && password.length <= 32) {
				const strongPasswordRegex =
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
				const passwordStrong = password.match(strongPasswordRegex);
				if (passwordStrong) {
					const salt = bcrypt.genSaltSync(11);
					req.body.password = bcrypt.hashSync(password, salt);
					passwordValid = true;
				} else {
					error.password = "Please enter strong password!";
				}
			} else {
				error.password =
					"Password length should be 8 to 32 characters long!";
			}
		} else {
			error.password = "Password is required!";
		}
		if (fullNameValid && emailValid && passwordValid) {
			next();
			return;
		}

		res.status(400).json({ error });
	} catch (error) {
		next(error);
	}
};
