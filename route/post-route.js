const express = require('express');
const verifyUser = require('../middleware/verify-middleware');
const router = express.Router();
const {createPost, fetchUserPosts,updatePost, deleteUserPostById, generatePostPdf} = require("../controllers/post-controllers");
const validate = require('../middleware/validation-middleware');
const {postSchema,updatePostSchema} = require('../validation/postValidationSchema');

router.route("/create").post(verifyUser,validate(postSchema),createPost);
router.route("/get-posts/:userId").get(verifyUser,fetchUserPosts);
router.route("/update-post/:postId").patch(verifyUser,validate(updatePostSchema),updatePost);
router.route("/delete-post/:postId").delete(verifyUser,deleteUserPostById);
router.route("/get-post/:postId").get(generatePostPdf);
module.exports = router;