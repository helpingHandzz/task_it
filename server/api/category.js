const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allCategories = await prisma.category.findMany({
      include: {
        Subcategory: {
          include: {
            Skills: true,
          },
        },
      },
    });
    res.send(allCategories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleCategory = await prisma.category.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        Subcategory: true,
      },
    });
    res.send(singleCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
