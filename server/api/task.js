const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const verify = require("../auth/verify");

// Gets all tasks
router.get("/", async (req, res, next) => {
  try {
    const allTasks = await prisma.task.findMany();
    res.status(200).json(allTasks);
  } catch (error) {
    next(error);
  }
});

// Gets a task by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const singleTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!singleTask) {
      res.status(404).json({ message: "Could not find book" });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    next(error);
  }
});

// Post a new task (only accessible to taskers)
router.post("/post", verify, async (req, res, next) => {
  try {
    const { tasker } = req;

    // Check if person is tasker
    const foundTasker = await prisma.tasker.findUnique({
      where: { id: tasker.taskerId },
    });

    if (!foundTasker.taskerId) {
      return res.status(403).json({
        error: "Only taskers can post new tasks",
      });
    }

    const {
      description,
      vehicleRequired,
      estTimeCommitment,
      startingStreet,
      startingCity,
      startingState,
      startingZip,
      startingSuite,
      endingStreet,
      endingCity,
      endingState,
      endingZip,
      endingSuite,
    } = req.body;

    const newTask = await prisma.task.create({
      data: {
        description,
        vehicleRequired,
        estTimeCommitment,
        startingStreet,
        startingCity,
        startingState,
        startingZip,
        startingSuite,
        endingStreet,
        endingCity,
        endingState,
        endingZip,
        endingSuite,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error posting new task" });
  }
});

module.exports = router;

// {
// 	"description": "test test test",
// 	"vehicleRequired": true,
// 	"estTimeCommitment": 3,
//   "startingStreet": "123 ABC",
//   "startingCity": "Hempstead",
//   "startingState": "NY",
//   "startingZip": "11212",
//   "startingSuite": "23",
//   "endingStreet": "123 ABC",
//   "endingCity": "Hempstead",
//   "endingState": "NY",
//   "endingZip": "11212",
//   "endingSuite": "23"
// }