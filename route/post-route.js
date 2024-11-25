const express = require('express')
const verifyUser = require('../middleware/verify-middleware')
const router = express.Router()
const {createPost} = require("../controllers/post-controllers")


router.route("/create").post(verifyUser,createPost)

module.exports = router