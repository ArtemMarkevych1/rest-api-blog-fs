const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyUser, forgotPassword, recoverPassword, changePassword, updateUser, getCurrentUser } = require('../controllers/auth');
const { signupValidator, validateResult, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator, updateUserValidator } = require('../validators');
const isAuth = require('../middlewares/isAuth');

router.get('/current-user', isAuth, getCurrentUser);
router.post('/signup', signupValidator, validateResult, register);
router.post('/signin', loginValidator, validateResult, login);
router.post('/verify-email', verifyEmailValidator, validateResult, verifyEmail);
router.post('/verify-user', verifyUserValidator, validateResult, verifyUser);
router.post('/forgot-password', verifyEmailValidator, validateResult, forgotPassword);
router.post('/recover-password', recoverPasswordValidator, validateResult, recoverPassword);
router.put('/change-password', isAuth, changePasswordValidator, validateResult, changePassword);
router.put('/update-user', isAuth, updateUserValidator, validateResult, updateUser);

module.exports = router;
