import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_CLIENT_SECRET);
    return token;
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if(user){
            return res.status(409).json({
                success: false,
                message: 'User with this email is already present!'
            })
        }
        let hash = bcrypt.hashSync(password, 10);
        user = {
            name,
            email,
            password: hash,
            cover_pic: 'mxlxddtnqran579kc9ei',
            profile_pic: 'l4tvsoidmnbyeotp22rm'
        }
        let result = await User.create(user);
        const userObj = {
            email: result.email,
            _id: result._id
        }
        const token = generateToken(userObj);
        res.status(200).json({
            success: true,
            message: 'Registration successful!',
            token,
            id: result._id,
            name: result.name,
            img: result.profile_pic
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }
        
        let correctPassword = bcrypt.compareSync(password, user.password);

        if(!correctPassword){
            return res.status(400).json({
                success: false,
                message: 'Incorrect password!'
            })
        }
        const userObj = {
            email: user.email,
            _id: user._id
        }
        const token = generateToken(userObj);
        res.send({
            success: true,
            message: 'Login successful!',
            token,
            id: user._id,
            name: user.name,
            img: user.profile_pic
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}