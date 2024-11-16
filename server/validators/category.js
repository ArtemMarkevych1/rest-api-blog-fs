const { check } = require('express-validator');
const mongoose = require('mongoose');

const createCategoryValidator = [
    check('title').notEmpty().withMessage('Title is required')
];

const idValidator = [
    check('id').custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid category id');
        }
    })
];

const paginationValidator = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    check('size')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Size must be between 1 and 100')
];

module.exports = {
    createCategoryValidator,
    idValidator,
    paginationValidator
};