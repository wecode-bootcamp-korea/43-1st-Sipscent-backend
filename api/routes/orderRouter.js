const express = require("express");
const {orderController} = require("../controllers");
const {loginRequired} = require("../utils/auth");

const router = express.Router();

router.get("", orderController.getOrderList);
router.post("", orderController.createPayment);
router.get("/status",  orderController.getOrderStatus);

module.exports = router;
