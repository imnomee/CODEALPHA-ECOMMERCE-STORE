import jwt from 'jsonwebtoken'; // Import JSON Web Token library

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.status(401).json({
            // If no token, deny access
            message: 'No token, auth denied',
            success: false,
        });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach user ID to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log('Auth', error); // Log any errors during token verification
        return res.status(401).json({
            // If token verification fails, deny access
            message: 'Token is not valid',
            success: false,
        });
    }
};

export default auth; // Export the auth middleware
