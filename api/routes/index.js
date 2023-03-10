const express = require("express");
const userRouter = require("./userRouter");
const mainRouter = require("./mainRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/", mainRouter);

module.exports = router;
