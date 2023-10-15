const express = require("express");
const expertController = require("./expert.controller");

const router = express.Router();

router.post("/signup", expertController.createExpert);

router.post("/login", expertController.loginExpert);

const expertRoutes = router;
module.exports = expertRoutes;
