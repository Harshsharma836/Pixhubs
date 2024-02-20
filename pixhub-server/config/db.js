import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL);
}

export default connectDB;