const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", (req, res, next) => {
	const { fName, lName, email, password } = req.body;
});
