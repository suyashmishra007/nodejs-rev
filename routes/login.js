const path = require("path");
const express = require("express");
const loginController = require("../controllers/auth");
const router = express.Router();

router.get("/post", loginController.postLogin);
router.get("/pre", loginController.preLogin);

module.exports = router;
