const express = require("express");
const router = express.Router();

const userController = require("./login.controllers");

router.post("/login", userController.login);

module.exports = router;
