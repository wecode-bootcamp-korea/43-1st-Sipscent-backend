const express = require("express");
const {itemController} = require("../controllers");
const {loginRequired} = require("../utils/auth");

const router = express.Router();

router.get('/floral/teabags', itemController.floralTeabags);
router.get('/herbal/teabags', itemController.herbalTeabags);
router.get('/citrus/teabags', itemController.citrusTeabags);
router.get('/floral/teacups', itemController.floralTeacups);
router.get('/herbal/teacups', itemController.herbalTeacups);
router.get('/citrus/teacups', itemController.citrusTeacups);

module.exports = router;

