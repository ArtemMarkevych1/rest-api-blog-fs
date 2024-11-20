const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      })
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded) // Debug log

    // 3. Find user and attach to request
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    // 4. Attach user to request object
    req.user = user
    console.log('User attached to request:', req.user) // Debug log

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    })
  }
} 