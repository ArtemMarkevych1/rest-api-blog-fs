const Post = require('../models/Post');
const { Categories, isValidCategory } = require('../helpers');

const createPost = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;

        // Check if user exists in request (set by auth middleware)
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Validate category
        if (category && !isValidCategory(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${Object.values(Categories).join(', ')}`
            });
        }

        const post = new Post({
            title,
            content,
            category: category || Categories.OTHER,
            createdBy: req.user._id
        });

        await post.save();

        const populatedPost = await Post.findById(post._id)
            .populate('createdBy', 'username profilePicture');

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: populatedPost
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating post'
        });
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const { category } = req.query;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const skip = (page - 1) * size;

        let query = {};

        if (category) {
            query.category = category;
        }

        const totalCount = await Post.countDocuments(query);
        const totalPages = Math.ceil(totalCount / size);

        const posts = await Post.find(query)
            .populate('category')
            .populate('createdBy', '-password')
            .skip(skip)
            .limit(size)
            .sort({ createdAt: -1 });

        // Add headers to prevent caching
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store'
        });

        res.status(200).json({
            success: true,
            message: posts.length > 0 ? "Posts fetched successfully" : "No posts found",
            pagination: {
                total: totalCount,
                totalPages,
                currentPage: page,
                pageSize: size,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            posts
        });
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content, tags, category } = req.body;

        const post = await Post.findByIdAndUpdate(postId, {
            title,
            content,
            tags,
            category: category || Categories.OTHER
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const updatedPost = await Post.findById(postId);

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            post
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};