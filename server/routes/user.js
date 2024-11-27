const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getCurrentUser, updateUser, getUserById } = require('../controllers/user');

router.get('/current-user', protect, getCurrentUser);
router.put('/update-user', protect, updateUser);
router.get('/get-user/:userId', getUserById);

module.exports = router;
