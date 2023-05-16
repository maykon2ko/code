const express = require("express");
const userController = require("../controllers/User");
const protect = require("../middleware/auth");

const router = express.Router();

router.route("/").post(userController.create);
router.route("/login").post(userController.login);
router.route("/:id").put(protect, userController.update);
router.route("/getall").get(protect, userController.getall);

module.exports = router;
