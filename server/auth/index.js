const express = require("express");
const router = express.Router();

router.use("/auth_tasker", require("./auth_tasker"));

module.exports = router;
