import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

/**
 * @route GET api/auth/user/
 * @desc Get all user
 * @access Public
 */
export const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route GET api/auth/user/:id
 * @desc Get a user
 * @access Public
 */
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * @route PUT api/user/:id
 * @desc Update a user
 * @access Private
 */
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, password, firstname, lastname } = req.body;
    console.log(req.body);

    // Simple validation
    if (!firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'First name and last name must be required',
        });
    }

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            const userResult = await User.findOne({ _id }).select('-password');
            res.json({
                success: true,
                message: 'User updated',
                user: userResult,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'You can update only own account',
        });
    }
};

/**
 * @route DELETE api/auth/user/:id
 * @desc Delete a user
 * @access Private
 */
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { _id, isAdmin } = req.body;
    if (id === _id || isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deleteUser) {
                return res
                    .status(401)
                    .json({ success: false, message: 'User not found' });
            }
            res.json({
                success: true,
                message: 'User deleted',
                user: deletedUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'Action not allowed',
        });
    }
};

/**
 * @route PUT api/auth/user/:id/follow
 * @desc Follow a user
 * @access Private
 */
export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    if (id === _id) {
        res.status(403).json({ success: false, message: 'Action Forbidden' });
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(_id);

            if (followUser.followers.includes(_id)) {
                return res.status(403).json({
                    success: false,
                    message: 'You are already following this user',
                });
            }

            await followUser.updateOne({ $push: { followers: _id } });
            await followingUser.updateOne({ $push: { following: id } });
            res.json({ success: true, message: 'Followed successfully' });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};

/**
 * @route PUT api/auth/user/:id/unfollow
 * @desc Unfollow a user
 * @access Private
 */
export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    if (id === _id) {
        res.status(403).json({ success: false, message: 'Action Forbidden' });
    } else {
        try {
            const unfollowUser = await User.findById(id);
            const unfollowingUser = await User.findById(_id);

            if (!unfollowUser.followers.includes(_id)) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not following this user',
                });
            }

            await unfollowUser.updateOne({ $pull: { followers: _id } });
            await unfollowingUser.updateOne({ $pull: { following: id } });
            res.json({ success: true, message: 'Unfollowed successfully' });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
