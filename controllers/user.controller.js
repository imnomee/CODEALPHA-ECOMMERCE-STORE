import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;

        let user = await User.findOne({ userEmail });

        if (user) {
            return res.status(400).json({
                message: 'User already exist with that email',
            });
        }

        //create
        user = new User({ userName, userEmail, userPassword });
        await user.save();

        //generate jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.userName,
                email: user.userEmail,
            },
        });
    } catch (error) {
        console.log('RegisterUser', error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        //find by email
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
                status: false,
            });
        }
        //compare passwords
        const isMatch = await user.comparePassword(userPassword);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password',
                status: false,
            });
        }

        //generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res
            .status(201)
            .cookie('token', token, {
                // Ensure token is set correctly in the cookie
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true, // Securely set the token as HTTP-only
                sameSite: 'strict', // SameSite policy for added security
            })
            .json({
                token,
                user: {
                    id: user.id,
                    name: user.userName,
                    email: user.userEmail,
                },
            });
    } catch (error) {
        console.log('LoginUser', error);
    }
};
