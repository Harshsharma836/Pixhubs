import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authorize = async (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ').pop();
        let user = jwt.verify(token, process.env.JWT_CLIENT_SECRET);
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            })
        }
        let exist = await User.findOne({ _id: user._id, email: user.email});
        if(!exist) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            })
        }
        req.user = exist;
        next();
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}