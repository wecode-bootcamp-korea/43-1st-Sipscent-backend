const express = require("express");
const { itemController } = require("../controllers");

const router = express.Router();

router.get("/:itemId", itemController.detailItem);

module.exports = router;
