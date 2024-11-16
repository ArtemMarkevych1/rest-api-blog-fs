const express = require('express');
const router = express.Router();
const { post } = require('../controllers');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = post;
const { isAuth } = require('../middlewares');

router.post('/', isAuth, createPost);
router.get('/', isAuth, getAllPosts);
router.get('/:postId', isAuth, getPostById);
router.put('/:postId', isAuth, updatePost);
router.delete('/:postId', isAuth, deletePost);

module.exports = router;