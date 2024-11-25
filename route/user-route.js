const express = require("express");
const verifyUser = require("../middleware/verify-middleware");
const router = express.Router();
const controller = require("../controllers/user-controller");

router.route("/update-user/:userId").patch(verifyUser, controller.updateUser);
router.route("/delete-user/:userId").delete(verifyUser,controller.deleteUser);
router.route("/signout/:userId").delete(verifyUser,controller.signOutUser);
router.route("/getuser/:userId").get(controller.getUserData);


module.exports = router;
