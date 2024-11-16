const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const { _id, role, isVerified } = user;
    return jwt.sign(
        {
            userId: _id,
            role,
            isVerified
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN } 
    );
};

module.exports = generateToken; 