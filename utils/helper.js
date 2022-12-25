async function usernameGenerating(email, forbiddenUsernames) {
	const User = require("../models/User");
	forbiddenUsernames = forbiddenUsernames || [
		"account",
		"accounts",
		"user",
		"users",
		"api",
	];
	const targetOfSlice = email.indexOf("@");
	let username = email.slice(0, targetOfSlice);
	let usernameExist = await User.findOne({ username });
	let IsForbiddenUsernames = forbiddenUsernames.includes(username);

	if (usernameExist || IsForbiddenUsernames) {
		let increment = 1;
		while (true) {
			var u = username + increment;
			usernameExist = await User.findOne({ username: u });
			IsForbiddenUsernames = forbiddenUsernames.includes(u);
			console.log(
				"Looping at 'usernameGenerating' func to generate username"
			);

			if (!usernameExist && !IsForbiddenUsernames) {
				break;
			} else {
				increment++;
			}
		}
		username = u;
	}

	return username;
}

function isValidEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const allowChars = /^[0-9a-zA-Z_@.]+$/;
	const validEmail = re.test(email) && allowChars.test(email);
	return validEmail;
}


module.exports = { usernameGenerating, isValidEmail };
