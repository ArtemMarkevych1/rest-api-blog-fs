const { check } = require('express-validator');
const validateEmail = require('./validateEmail');
const mongoose = require('mongoose');
const File = require('../models/File');

const signupValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
];

const loginValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];

const verifyEmailValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
];

const verifyUserValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('code')
        .trim()
        .notEmpty().withMessage('Code is required')
];

const recoverPasswordValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('code')
        .trim()
        .notEmpty().withMessage('Code is required'),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];

const changePasswordValidator = [
    check('oldPassword')
        .trim()
        .notEmpty().withMessage('Old password is required'),
    check('newPassword')
        .trim()
        .notEmpty().withMessage('New password is required')
];

const updateUserValidator = [
    check('email').custom(async (email) => {
        if (email) {
            const isEmailValid = await validateEmail(email);
            if (!isEmailValid) {
                throw new Error('Invalid email format');
            }
        }
    }),
    check('profilePicture')
        .custom(async (profilePicture) => {
            if (profilePicture && !mongoose.Types.ObjectId.isValid(profilePicture)) {
                throw new Error('Invalid file ID');
            }
            if (profilePicture && mongoose.Types.ObjectId.isValid(profilePicture)) {
                const isFileExist = await File.findById(profilePicture);
                if (!isFileExist) {
                    throw new Error('File not found');
                }
            }
        })
];

module.exports = {
    signupValidator,
    loginValidator,
    verifyEmailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator,
    updateUserValidator
};