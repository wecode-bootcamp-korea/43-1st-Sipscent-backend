const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", loginRequired, cartController.createCart);
router.get("", loginRequired, cartController.getCarts);
router.patch("", loginRequired, cartController.updateCart);
router.delete("", loginRequired, cartController.deleteCart);

module.exports = router;
