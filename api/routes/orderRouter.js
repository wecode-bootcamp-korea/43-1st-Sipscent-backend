const express = require("express");
const { orderController } = require("../controllers");
const {loginRequired} = require("../utils/auth");

const router = express.Router();

router.get("/", loginRequired, orderController.order);
router.post("/", loginRequired, orderController.payment);

module.exports = router;
