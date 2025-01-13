const express = require("express");
const verifyUser = require("../middleware/verify-middleware");
const router = express.Router();
const controller = require("../controllers/user-controller");
const validate = require('../middleware/validation-middleware');
const {updateUserSchema} = require("../validation/userValidationSchema");

router.route("/update-user/:userId").patch(verifyUser,validate(updateUserSchema), controller.updateUser);
router.route("/delete-user/:userId").delete(verifyUser,controller.deleteUser);
router.route("/signout/:userId").delete(verifyUser,controller.signOutUser);
router.route("/getuser/:userId").get(verifyUser,controller.getUserData);


module.exports = router;
