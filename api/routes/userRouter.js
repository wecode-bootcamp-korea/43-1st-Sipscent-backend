const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/check", userController.checkEmail);

module.exports = router;
