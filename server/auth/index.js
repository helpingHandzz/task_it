const express = require("express");
const router = express.Router();

router.use("/auth_tasker", require("./auth_tasker"));
router.use("/auth_taskee", require("./auth_taskee"));

module.exports = router;
