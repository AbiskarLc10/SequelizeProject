const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth-controllers')
const validate = require('../middleware/validation-middleware')
const { signUpSchema } = require('../validation/userValidationSchema')


router.route('/signup').post(validate(signUpSchema),controller.SignUp)
router.route('/signin').post(controller.SignIn)


module.exports= router