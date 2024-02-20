import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        user_img: {
            type: String,
            required: true
        },
        likes: [String],
        total_comments: Number
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('post', postSchema);

export default Post;