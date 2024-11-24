const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getCurrentUser, updateUser } = require('../controllers/user');

router.get('/current-user', protect, getCurrentUser);
router.put('/update-user', protect, updateUser);

module.exports = router;
