const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = router;
