const express = require("express");
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const cartRouter = require("./cartRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/carts", cartRouter);

module.exports = router;
