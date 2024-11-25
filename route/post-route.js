const express = require('express')
const verifyUser = require('../middleware/verify-middleware')
const router = express.Router()
const {createPost, fetchUserPosts} = require("../controllers/post-controllers")
const validate = require('../middleware/validation-middleware')
const postSchema = require('../validation/postValidationSchema')

router.route("/create").post(verifyUser,validate(postSchema),createPost)
router.route("/get-posts/:userId").get(verifyUser,fetchUserPosts)

module.exports = router