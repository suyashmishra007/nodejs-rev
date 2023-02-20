const express = require("express");
const loginController = require("../controllers/auth");
const router = express.Router();
const isAuth = require("../middleware/is-auth.js");

router.post("/signup", loginController.postSignup);
router.get("/logout", loginController.postLogout);
router.get("/post", loginController.postLogin);
router.get("/login", loginController.preLogin);
router.get("/add-product", isAuth, loginController.getAddProduct);

module.exports = router;
