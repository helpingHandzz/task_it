const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { cloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prismaClient = new PrismaClient();
const SALT_ROUNDS = 5;
const fileUploadAvatars = require("../middleware/file-upload");

// login handler for taskee
router.post(
	"/login",
	fileUploadAvatars.single(""),
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
			}

			const { password } = foundUser;

			console.log(`foundUser: `, foundUser);

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

			res.status(200).json({ ...foundUser, token });
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

// register handler for taskee
router.post(
	"/register",
	fileUploadAvatars.single("avatar"),
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

		// console.log(`req: `, req?.file, req.body);
		console.log(`req.file: `, req);

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

			const createdUser = await prismaClient.taskee.create({
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

			// res.status(201).send({
			// 	createdUser: { ...createdUser, token },
			// });
		} catch (error) {
			console.error(error.message);
			next(error);
		}
	}
);

module.exports = router;
