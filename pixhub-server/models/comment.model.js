import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        post_id: {
            type: String,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        user_img: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('comment', commentSchema);

export default Comment;