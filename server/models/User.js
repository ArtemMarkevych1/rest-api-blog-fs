const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        required: true
    },
    verificationCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordCode: {
        type: String,
    }
}, {
    timestamps: true,
});

// Virtual for user's posts
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'createdBy'
});

module.exports = mongoose.model('User', userSchema);


