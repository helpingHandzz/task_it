const {
	query,
	validationResult,
} = require("express-validator");

const validatorAuth = (req, res, next) => {
	const result = validationResult(req.body);

	if (!result.isEmpty()) {
		res
			.status(404)
			.json({ message: "Error on validation!" });
	}
	next();
};

module.exports = validatorAuth;
