const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prismaClient = new PrismaClient();
const SALT_ROUNDS = 5;

// route handler for registering a user in
router.post(
	"/register",
	body("email").isEmail(),
	body("phone").isMobilePhone(),
	async (req, res, next) => {
		const { fName, lName, email, password, phone } =
			req.body;

		try {
			const hashedPassword = await bcrypt.hash(
				password,
				SALT_ROUNDS
			);

			// checks to see if user is already logged in with the same email
			const foundUser =
				await prismaClient.tasker.findUnique({
					where: {
						email,
					},
				});

			if (foundUser) {
				res.status(500).json({
					message: "User already exists!",
				});
			}

			const createdUser = await prismaClient.tasker.create({
				data: {
					fName,
					lName,
					email,
					password: hashedPassword,
					phone,
				},
			});

			const token = jwt.sign(
				createdUser.email,
				process.env.JWT
			);

			res.status(201).json({
				...createdUser,
				token,
			});
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

// login handler for tasker
router.post(
	"/login",
	body("email").isEmail(),
	async (req, res, next) => {
		const { email, password: plainPassword } = req.body;

		try {
			const foundUser =
				await prismaClient.tasker.findUnique({
					where: {
						email,
					},
				});

			if (!foundUser) {
				res.status(404).json({
					message: "User not found!",
				});
			}

			const { password } = foundUser;

			const validPassword = await bcrypt.compare(
				plainPassword,
				password
			);

			if (!validPassword) {
				res.status(404).json({
					message: "Invalid password",
				});
			}

			const token = jwt.sign(
				foundUser.email,
				process.env.JWT
			);

			res.status(200).json({
				...foundUser,
				token,
			});
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

module.exports = router;
