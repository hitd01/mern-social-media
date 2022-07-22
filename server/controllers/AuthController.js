import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// @route POST api/auth/register
// @desc Register new user
// @access Public
export const registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    // Simple validation
    if (!username || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message:
                'Missing username and/or password and/or firstname and/or lastname',
        });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: 'Username already taken' });
        }

        // All good
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            firstname,
            lastname,
        });
        await newUser.save();

        res.json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internet server error',
        });
    }
};

// @route POST api/auth/login
// @desc Login user
// @access Public
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        // check for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password',
            });
        }

        // Username found
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password',
            });
        }

        // All good
        res.json({
            success: true,
            message: 'Logged in successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internet server error',
        });
    }
};
