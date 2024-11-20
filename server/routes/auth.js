const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { register, login, verifyEmail, verifyUser, forgotPassword, recoverPassword, changePassword, updateUser, getCurrentUser } = require('../controllers/auth');
const { signupValidator, validateResult, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator, updateUserValidator } = require('../validators');

router.get('/current-user', protect, getCurrentUser);
router.post('/signup', signupValidator, validateResult, register);
router.post('/signin', loginValidator, validateResult, login);
router.post('/verify-email', verifyEmailValidator, validateResult, verifyEmail);
router.post('/verify-user', verifyUserValidator, validateResult, verifyUser);
router.post('/forgot-password', verifyEmailValidator, validateResult, forgotPassword);
router.post('/recover-password', recoverPasswordValidator, validateResult, recoverPassword);
router.put('/change-password', protect, changePasswordValidator, validateResult, changePassword);
router.put('/update-user', protect, updateUserValidator, validateResult, updateUser);

module.exports = router;
