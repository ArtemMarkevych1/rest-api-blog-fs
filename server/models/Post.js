const mongoose = require('mongoose');
const { Categories } = require('../helpers');

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

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
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: null
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

postSchema.index({ createdBy: 1, createdAt: -1 });
postSchema.index({ likes: 1 });

postSchema.methods.toggleLike = function(userId) {
    const userLikeIndex = this.likes.indexOf(userId);
    
    if (userLikeIndex === -1) {
        this.likes.push(userId);
        this.likesCount += 1;
    } else {
        this.likes.splice(userLikeIndex, 1);
        this.likesCount -= 1;
    }
    
    return this.save();
}

postSchema.virtual('isLiked').get(function() {
    return this.likes.includes(this._id);
});

module.exports = mongoose.model('Post', postSchema);