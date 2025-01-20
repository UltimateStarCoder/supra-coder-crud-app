import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

export async function connectToDatabase() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }

        return await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to database');
    }
}