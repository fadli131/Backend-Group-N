const authController = require("../controllers/authController");
const { Router } = require("express");
const router = Router();

const { validateRegister, validateLogin } = require('../middleware/validator');
const { loginLimiter } = require('../middleware/ratelimit')

//register user
router.post("/register", validateRegister, authController.Register);
//login user
router.post("/login", loginLimiter, validateLogin, authController.Login);

module.exports = router;