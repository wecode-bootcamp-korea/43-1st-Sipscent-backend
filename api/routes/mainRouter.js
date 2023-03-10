const express = require("express");
const { mainController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, mainController.getCart);
router.patch("", loginRequired, mainController.updateCart);
router.delete("", loginRequired, mainController.deleteCart);

module.exports = router;
