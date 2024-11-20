const mongoose = require('mongoose');
const { Categories } = require('../helpers');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: Object.values(Categories),
        required: true,
        default: Categories.OTHER
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

postSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);