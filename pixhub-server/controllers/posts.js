import Post from '../models/post.model.js';
import {v2 as cloudinary} from 'cloudinary'

export const addPost = async (req, res) => {
    try {
        const { name, desc, img, user_id, user_img, public_id, version, signature } = req.body;
        const expectedSignature = cloudinary.utils.api_sign_request({ 
            public_id: public_id, version: version 
        }, process.env.CLOUD_API_SECRET);

        if (expectedSignature === req.body.signature) {
            let postObj = {
                desc, 
                user_id: req.user._id,
                user_img: req.user.profile_pic,
                name: req.user.name,
                img: public_id,
                total_comments: 0
            }
            let result = await Post.create(postObj); 

            res.status(200).json({ 
                success: true,
                message: 'Posted successful!'
            })
        }else{
            res.status(400).json({ 
                success: false,
                message: 'Something went wrong!'
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        let posts;
        const { id, skip } = req.query
        if(id === 'ALL'){
            posts = await Post.find({}).sort({ createdAt: -1}).limit(skip);
        }else{
            posts = await Post.find({ user_id: id}).sort({ createdAt: -1}).limit(skip);
        }
        res.status(200).json({  
            success: true,
            data: posts
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
 
export const deletePost = async (req, res) => {
    try { 
        const { id } = req.params;
        let post = await Post.findOneAndDelete({ _id: id, user_id: req.user._id });
        if(post){
            return res.status(200).json({ 
                success: true,
                data: post,
                message: 'Post deleted successfully!'
            })
        }

        res.status(404).json({ 
            success: false,
            message: 'Something went wrong!'
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
 