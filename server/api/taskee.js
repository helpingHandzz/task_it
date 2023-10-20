const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all taskees
router.get("/", async (req, res, next) => {
  try {
    const allTaskees = await prisma.taskee.findMany({
      include: {
        Skills: true,
      },
    });
    res.status(200).json(allTaskees);
  } catch (error) {
    next(error);
  }
});

// Get taskee by id
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
    res.status(200).json(singleTaskee);
  } catch (error) {
    next(error);
  }
});

// Get reviews by taskee id
router.get("/reviews/:id", async (req, res, next) => {
  try {
    const singleTaskeeReviews = await prisma.taskeeReview.findMany({
      where: {
        taskeeId: +req.params.id,
      },
      include: {
        tasker: true,
      },
    });
    res.status(200).json(singleTaskeeReviews);
  } catch (error) {
    next(error);
  }
});

// Create taskee review
router.post("/reviews/new", async (req, res, next) => {
  const { taskeeId, rating, reviewedBy, text, date } = req.body;
  try {
    const newReview = await prisma.taskeeReview.create({
      data: {
        taskeeId,
        rating,
        reviewedBy,
        text,
        date,
      },
    });
    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
});

// Edit taskee review
router.put("/reviews/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { taskeeId, rating, reviewedBy, text, date } = req.body;
  try {
    const updatedReview = await prisma.taskeeReview.update({
      where: {
        id: +id,
      },
      data: {
        taskeeId,
        rating,
        reviewedBy,
        text,
        date,
      },
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

// Delete taskee review
router.delete("/reviews/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedReview = await prisma.taskeeReview.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json(deletedReview);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
