import mongoose from 'mongoose';
import PostModel from '../models/PostModel.js';
import UserModel from '../models/UserModel.js';

/**
 * @route POST api/post
 * @desc Create a new post
 * @access Private
 */
export const createPost = async (req, res) => {
    const { userId, desc } = req.body;

    // Simple validation
    if (!userId || !desc) {
        return res.status(400).json({
            success: false,
            message: 'Description missing or not logged in',
        });
    }

    try {
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.json({
            success: true,
            message: 'Create post successfully',
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route GET api/post/:id
 * @desc Get a post
 * @access Public
 */
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);

        // Post not found
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        // All good
        res.json({ success: true, post });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route PUT api/post/:id
 * @desc Update a post
 * @access Private
 */
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { userId, desc } = req.body;

    // Simple validation
    if (!userId || !desc) {
        return res.status(400).json({
            success: false,
            message: 'Description missing or not logged in',
        });
    }

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.json({ success: true, message: 'Post updated successfully' });
        } else {
            res.status(403).json({
                success: false,
                message: 'Authentication failed',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route DELETE api/post/:id
 * @desc Delete a post
 * @access Private
 */
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.json({ success: true, message: 'Post deleted successfully' });
        } else {
            res.status(403).json({
                success: false,
                message: 'Action forbidden',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route PUT api/post/:id/like
 * @desc Toggles like/dislike a post
 * @access Private
 */
export const likePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);

        // Post not found
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        // All good
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.json({ success: true, message: 'Post liked successfully' });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.json({ success: true, message: 'Post disliked successfully' });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route GET api/post/:id/timeline
 * @desc Get timeline posts
 * @access Private
 */
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        // User not found
        const user = await UserModel.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        // All good
        const currentPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'following',
                    foreignField: 'userId',
                    as: 'followingPosts',
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.json({
            success: true,
            posts: currentPosts
                .contact(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
