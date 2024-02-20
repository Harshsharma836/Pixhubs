import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        followers: [String],
        cover_pic: String,
        profile_pic: String,
        city: String,
        website: String
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

export default User;