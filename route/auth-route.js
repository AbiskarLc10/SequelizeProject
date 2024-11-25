const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth-controllers')


router.route('/signup').post(controller.SignUp)
router.route('/signin').post(controller.SignIn)


module.exports= router