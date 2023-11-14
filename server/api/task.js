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
      res.status(404).json({ message: "Could not find task" });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    next(error);
  }
});

// Post a new task (only accessible to taskers)
router.post("/new", verify, async (req, res, next) => {
  console.log("hit");
  try {
    const { tasker } = req;

    // Check if person is tasker
    const foundTasker = await prisma.tasker.findFirst({
      where: { email: tasker },
    });

    if (!foundTasker) {
      return res.status(403).json({
        error: "Only taskers can post new tasks",
      });
    }

    const {
      subcategoryId,
      description,
      isCompleted,
      vehicleRequired,
      isAssigned,
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
        taskerId: foundTasker.id,
        subcategoryId,
        description,
        isCompleted,
        vehicleRequired,
        isAssigned,
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

// Delete a task by ID (only accessible to taskers)
router.delete("/delete/:id", verify, async (req, res) => {
  try {
    const { tasker } = req;

    // Check if person is tasker
    const foundTasker = await prisma.tasker.findUnique({
      where: { email: tasker },
    });

    if (!foundTasker) {
      return res.status(403).json({
        error: "Only taskers can delete tasks",
      });
    }

    const { id } = req.params;
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(201).json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Error deleting task. Either task doesnt exist or there was a server error",
    });
  }
});

// Edit a task by ID (only accessible to taskers)
router.put("/edit/:id", verify, async (req, res, next) => {
  try {
    const { tasker } = req;
    console.log(req.body);
    
    // Check if person is tasker
    const foundTasker = await prisma.tasker.findUnique({
      where: { email: tasker },
    });

    if (!foundTasker) {
      return res.status(403).json({
        error: "Only taskers can edit tasks",
      });
    }

    const { id } = req.params;
    const {
      assignedTo,
      taskerId,
      subcategoryId,
      description,
      isCompleted,
      vehicleRequired,
      isAssigned,
      estTimeCommitment,
      startTime,
      date,
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

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        taskerId,
        assignedTo,
        subcategoryId,
        description,
        isCompleted,
        vehicleRequired,
        isAssigned,
        estTimeCommitment,
        startTime,
        date,
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
      include: {
        taskee: {
          include: {
            Skills: true,
          },
        },
        subcategory: true,
      },
    });
    res.status(201).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error updating task because task does not exist",
    });
  }
});

module.exports = router;
