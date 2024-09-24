import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'No token, auth denied',
            success: false,
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.log('Auth', error);
    }
};

export default auth;
