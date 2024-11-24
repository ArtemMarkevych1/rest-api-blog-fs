const User = require('../models/User');
const Post = require('../models/Post');
const File = require('../models/File');

const getCurrentUser = async (req, res) => {
    try {
        // Get user without posts first
        const user = await User.findById(req.user._id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Separately fetch only posts created by this user
        const userPosts = await Post.find({ createdBy: user._id })
            .sort('-createdAt')
            .populate('createdBy', 'username profilePicture');

        // Combine user data with their posts
        const userData = {
            ...user.toObject(),
            posts: userPosts
        };

        res.json({
            success: true,
            message: 'User fetched successfully',
            data: userData
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching user data'
        });
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        .select('-password');

        const { username, email, profilePicture } = req.body;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.username = username ? username : user.username;
        user.email = email ? email : user.email;
        user.profilePicture = profilePicture ? profilePicture : user.profilePicture;

        if (!email && !username && !profilePicture) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        if (email) {
            const isEmailExist = await User.findOne({ email });
            if (isEmailExist) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        if (username) {
            const isUsernameExist = await User.findOne({ username });
            if (isUsernameExist) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }
        }

        if (profilePicture) {
            const isFileExist = await File.findById(profilePicture);
            if (!isFileExist) {
                return res.status(404).json({
                    success: false,
                    message: "File not found"
                });
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCurrentUser,
    updateUser
}
