const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { cloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const prismaClient = new PrismaClient();

router.post("/register", async (req, res, next) => {
	const {
		fName,
		lName,
		email,
		password,
		phone,
		city,
		state,
	} = req.body;

	try {
		const hashedPassword = await bcrypt.hash(
			password,
			SALT_ROUNDS
		);

		// checks to see if user is already logged in with the same email
		const foundUser = await prismaClient.tasker.findUnique({
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
			},
		});

		const token = jwt.sign(
			createdUser.email,
			process.env.JWT
		);

		res.status(201).json({
			createdUser: { ...createdUser, token },
		});
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
