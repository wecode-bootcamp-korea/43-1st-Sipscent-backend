const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter);
const itemRouter = require("./itemRouter");
router.use("/items", itemRouter);


module.exports = router;
