const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prismaClient = new PrismaClient();
const SALT_ROUNDS = 5;
const { body } = require("express-validator");

// login handler for taskee
router.post(
	"/login",
	body("email").isEmail(),
	async (req, res, next) => {
		const { email, password: plainPassword } = req.body;

		try {
			const foundUser =
				await prismaClient.taskee.findUnique({
					where: {
						email,
					},
				});

			if (!foundUser) {
				res.status(404).json({
					message: "User not found!",
				});
			} else {
				const { password } = foundUser;

				const validPassword = await bcrypt.compare(
					plainPassword,
					password
				);

				if (!validPassword) {
					res.status(404).json({
						message: "Invalid password",
					});
					return
				}

				const token = jwt.sign(
					foundUser.email,
					process.env.JWT
				);

				res.status(200).json({ ...foundUser, token });
			}
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

// register handler for taskee
router.post(
	"/register",
	body("email").isEmail(),
	async (req, res, next) => {
		const {
			fName,
			lName,
			email,
			password,
			phone,
			city,
			state,
		} = req.body;

		const photo = "";

		try {
			const hashedPassword = await bcrypt.hash(
				password,
				SALT_ROUNDS
			);

			// checks to see if user is already logged in with the same email
			const foundUser =
				await prismaClient.taskee.findUnique({
					where: {
						email,
					},
				});

			if (foundUser) {
				res.status(500).json({
					message: "User already exists!",
				});
			} else {
				const createdUser =
					await prismaClient.taskee.create({
						data: {
							fName,
							lName,
							email,
							password: hashedPassword,
							phone,
							city,
							state,
							photo,
						},
					});

				const token = jwt.sign(
					createdUser.email,
					process.env.JWT
				);

				res.status(201).json({
					createdUser: { ...createdUser, token },
				});
			}
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

module.exports = router;
