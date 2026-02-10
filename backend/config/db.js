import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

const connectDB = async () => {
    try {
        // Inside config/db.js
        // console.log("Attempting to connect with URI:", process.env.MONGO_URI); // Debug line
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Remove deprecated options
        // await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
