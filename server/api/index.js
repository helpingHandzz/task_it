const express = require("express");
const router = express.Router();

// router.use("/category", require("./category"));
// router.use("/skills", require("./skills"));
// router.use("/task", require("./task"));
// router.use("/taskee", require("./taskee"));
router.use("/tasker", require("./tasker"));
module.exports = router;
