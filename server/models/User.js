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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        default: null
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [1, 2, 3],
        default: 3,
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
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);


