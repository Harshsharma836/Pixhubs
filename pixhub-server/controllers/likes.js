import Post from '../models/post.model.js'

export const likePost = async (req, res) => { 
    try {
        let { id } = req.params;
        let post = await Post.findOne({ _id: id });
        if(post){
            if(post.likes.includes(req.user._id)){
                post.likes.splice(post.likes.indexOf(req.user._id), 1);
            }else{
                post.likes.push(req.user._id);
            }
            let result = await Post.findOneAndUpdate({ _id: id }, post );
            res.status(200).json({ 
                success: true,
                message: 'success!'
            })
        }else{
            res.status(200).json({ 
                success: false,
                message: 'something went wrong!'
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