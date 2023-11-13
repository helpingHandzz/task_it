const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all taskers

router.get("/", async (req, res, next) => {
  try {
    const allTaskers = await prisma.tasker.findMany();
    res.send(allTaskers);
  } catch (error) {
    next(error);
  }
});

// get tasker by id
router.get("/:id", async (req, res, next) => {
  try {
    const taskerId = await prisma.tasker.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        Task: {
          include: {
            subcategory: true,
            taskeeReview: true,
            taskee: {
              include: {
                TaskeeReview: true,
                Skills: true,
              },
            },
          },
        },
      },
    });
    res.send(taskerId);
  } catch (error) {
    next(error);
  }
});

// get reviews by tasker id

router.get("/reviews/:id", async (req, res, next) => {
  try {
    const singleTaskerReviews = await prisma.taskerReview.findMany({
      where: {
        taskerId: Number(req.params.id),
      },
      include: {
        taskee: true,
      },
    });
    res.send(singleTaskerReviews);
  } catch (error) {
    next(error);
  }
});

// create tasker review

router.post("/reviews/new", async (req, res, next) => {
  const { taskerId, rating, reviewedBy, text, date, taskId } = req.body;
  try {
    await prisma.$executeRaw`
            SELECT setval((
                SELECT PG_GET_SERIAL_SEQUENCE('"TaskerReview"', 'id')),
                (SELECT (MAX("id") + 1) FROM "TaskerReview"),
                false) FROM "TaskerReview"`;
    const newReview = await prisma.taskerReview.create({
      data: {
        taskerId,
        rating,
        reviewedBy,
        text,
        date,
      },
    });
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        reviewTasker: newReview.id,
      },
    });
    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
});

// edit tasker review

router.put("/reviews/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { taskerId, rating, reviewedBy, text, date } = req.body;
  try {
    const updatedReview = await prisma.taskerReview.update({
      where: {
        id: +id,
      },
      data: {
        taskerId,
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

// delete tasker review

router.delete("reviews/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedReview = await prisma.taskerReview.delete({
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
