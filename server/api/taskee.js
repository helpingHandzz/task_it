const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
	try {
		const allTaskees = await prisma.taskee.findMany({
			include: {
				Skills: true,
			},
		});
		res.send(allTaskees);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const singleTaskee = await prisma.taskee.findUnique({
			where: {
				id: +req.params.id,
			},
			include: {
				Skills: true,
			},
		});
		res.send(singleTaskee);
	} catch (error) {
		next(error);
	}
});

router.get("/reviews/:id", async (req, res, next) => {
	try {
		const singleTaskeeReviews =
			await prisma.taskeeReview.findMany({
				where: {
					taskeeId: +req.params.id,
				},
			});
		res.send(singleTaskeeReviews);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
