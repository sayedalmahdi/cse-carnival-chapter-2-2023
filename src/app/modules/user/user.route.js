const express = require("express");
const userController = require("./user.controller");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");

const router = express.Router();

router.get("/", verifyAuthToken, userController.getAllUsers);
router.get("/:id", verifyAuthToken, userController.getUserById);

const userRoutes = router;
module.exports = userRoutes;
