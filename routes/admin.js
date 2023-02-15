const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/add-product", function (req, res) {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.get("/product", function (req, res) {
  res.send("INSIDE ADMIN PRODUCT");
});

module.exports = router;
