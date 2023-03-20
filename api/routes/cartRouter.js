const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("",  cartController.createCart);
router.get("", cartController.getCarts);
router.patch("", cartController.updateCart);
router.delete("",  cartController.deleteCart);

module.exports = router;
