const express = require("express");
const { itemController } = require("../controllers");

const router = express.Router();

router.get("/:category/teabags", itemController.teabags);
router.get("/:category/teacups", itemController.teacups);
router.get("/:itemId", itemController.detailItem);

module.exports = router;
