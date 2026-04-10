import mongoose from 'mongoose';
import dns from 'node:dns';

function configureDnsServers() {
    const configured = (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

    if (configured.length > 0) {
        dns.setServers(configured);
    }
}

const connectDB = async () => {
    try {
        configureDnsServers();
        // Inside config/db.js
        // console.log("Attempting to connect with URI:", process.env.MONGO_URI); // Debug line
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Remove deprecated options
        // await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectDB;
