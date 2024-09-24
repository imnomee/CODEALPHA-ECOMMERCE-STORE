import User from '../models/user.model.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import JSON Web Token library

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body; // Destructure user data from request body

        // Check if the user already exists
        let user = await User.findOne({ userEmail });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with that email',
            });
        }

        // Create a new user
        user = new User({ userName, userEmail, userPassword });
        await user.save(); // Save the user to the database

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        // Return the token and user information
        return res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.userName,
                email: user.userEmail,
            },
        });
    } catch (error) {
        console.log('RegisterUser', error); // Log any errors that occur
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
        });
    }
};

// Login an existing user
export const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body; // Destructure user credentials from request body

        // Find the user by email
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
                status: false,
            });
        }

        // Compare the provided password with the stored password
        const isMatch = await user.comparePassword(userPassword);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password',
                status: false,
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        // Set the token in an HTTP-only cookie and return user info
        return res
            .status(201)
            .cookie('token', token, {
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
        console.log('LoginUser', error); // Log any errors that occur
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
        });
    }
};
