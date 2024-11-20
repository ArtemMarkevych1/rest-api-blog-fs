const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { post } = require('../controllers');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = post;

router.post('/', protect, createPost);
router.get('/', protect, getAllPosts);
router.get('/:postId', protect, getPostById);
router.put('/:postId', protect, updatePost);
router.delete('/:postId', protect, deletePost);

module.exports = router;