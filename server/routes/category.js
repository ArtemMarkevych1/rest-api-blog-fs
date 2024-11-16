const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } = require('../controllers/category');
const { createCategoryValidator, idValidator, paginationValidator, validateResult } = require('../validators');
const { isAuth, isAdmin } = require('../middlewares');

router.get('/categories', isAuth, paginationValidator, validateResult, getAllCategories);
router.get('/:id', isAuth, idValidator, validateResult, getCategoryById);
router.post('/', isAuth, isAdmin, createCategoryValidator, validateResult, createCategory);
router.put('/:id', isAuth, isAdmin, idValidator, validateResult, updateCategory);
router.delete('/:id', isAuth, isAdmin, idValidator, validateResult, deleteCategory);

module.exports = router;