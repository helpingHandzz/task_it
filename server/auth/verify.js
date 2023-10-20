const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const verify = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    res.status(404).json({
      error: "Authorization token is missing.",
    });
  }

  try {
    const tasker = jwt.verify(token, process.env.JWT);
    req.tasker = tasker;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Authorized denied!" });
    return;
  }
};

module.exports = verify;
