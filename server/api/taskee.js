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
        TaskeeReview: {
          include: {
            tasker: true,
          },
        },
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
        Task: {
          include: {
            subcategory: true,
            tasker: {
              include: {
                TaskerReview: true,
              },
            },
          },
        },
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

// Get Taskee Work Schedule by id
router.get("/schedule/:id", async (req, res, next) => {
  try {
    const taskeeId = parseInt(req.params.id);
    const taskeeScheduleById = await prisma.workSchedule.findMany({
      where: { taskeeId: taskeeId },
    });
    res.status(200).json(taskeeScheduleById);
  } catch (error) {
    next(error);
  }
});


// Create taskee review
router.post("/reviews/new", async (req, res, next) => {
  const { taskeeId, rating, reviewedBy, text, date, taskId } = req.body;
  try {
    await prisma.$executeRaw`
            SELECT setval((
                SELECT PG_GET_SERIAL_SEQUENCE('"TaskeeReview"', 'id')),
                (SELECT (MAX("id") + 1) FROM "TaskeeReview"),
                false) FROM "TaskeeReview"`;

    const newReview = await prisma.taskeeReview.create({
      data: {
        taskeeId,
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
        reviewTaskee: newReview.id,
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

// Post to Taskee Work Schedule
router.post("/schedule/new", async (req, res, next) => {
  const { taskeeId, workSchedules } = req.body;

  if (!Array.isArray(workSchedules)) {
    return res.status(400).send("workSchedules must be an array.");
  }

  try {
    const createdOrUpdatedSchedules = [];

    for (let schedule of workSchedules) {
      const { date, startTime, endTime } = schedule;

      console.log("Date value:", schedule);

      const startDateTime = new Date(`${date}T${startTime}:00Z`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}:00Z`).toISOString();

      const existingSchedule = await prisma.workSchedule.findFirst({
        where: {
          taskeeId: taskeeId,
          date: date,
        },
      });
      let newOrUpdatedSchedule;
      if (existingSchedule) {
        newOrUpdatedSchedule = await prisma.workSchedule.update({
          where: {
            id: existingSchedule.id,
          },
          data: {
            startTime: startDateTime,
            endTime: endDateTime,
          },
        });
      } else {
        newOrUpdatedSchedule = await prisma.workSchedule.create({
          data: {
            ...schedule,
            startTime: startDateTime,
            endTime: endDateTime,
            taskeeId: taskeeId,
          },
        });
      }
      createdOrUpdatedSchedules.push(newOrUpdatedSchedule);
    }
    res.status(200).send(createdOrUpdatedSchedules);
  } catch (error) {
    next(error);
  }
});

// Delete Taskee Work Schedule
router.delete("/schedule/delete/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const deleteTaskeeSchedule = await prisma.workSchedule.delete({
      where:{
        id: +id,
      },
    })
    res.status(200).json(deleteTaskeeSchedule);
  } catch (error) {
    next(error);
  }
})

// Update Taskee Tools
router.put("/tools/:id", async (req, res, next) => {
  const { id } = req.params;
  const { tools } = req.body;

  try {
    const updatedTaskee = await prisma.taskee.update({
      where: { id: parseInt(id)},
      data: { tools },
    });
    res.status(200).json(updatedTaskee);
  } catch (error) {
    next(error);
  }
});

// Update Taskee Vehicles
router.put("/vehicles/:id", async (req, res, next) => {
  const { id } = req.params;
  const { vehicles } = req.body;
  try {
    const updatedTaskee = await prisma.taskee.update({
      where: { id: parseInt(id) },
      data: { vehicles },
    });
    res.status(200).json(updatedTaskee);
  } catch (error) {
    next(error);
  }
});

// Update Taskee Facts
router.put("/facts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { facts } = req.body;
  try {
    const updatedTaskee = await prisma.taskee.update({
      where: { id: parseInt(id) },
      data: { facts },
    });
    res.status(200).json(updatedTaskee);
  } catch (error) {
    next(error);
  }
});

// Update Taskee About
router.put("/about/:id", async (req, res, next) => {
  const { id } = req.params;
  const { about } = req.body;
  try {
    const updatedTaskee = await prisma.taskee.update({
      where: { id: parseInt(id) },
      data: { about },
    });
    res.status(200).json(updatedTaskee);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
