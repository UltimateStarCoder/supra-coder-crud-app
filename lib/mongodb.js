import mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
};

export async function connectDB() {
    try {
        // Check for MONGODB_URI
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in environment variables');
        }

        // If already connected, return
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        
        console.log('MongoDB Connected:', {
            host: conn.connection.host,
            port: conn.connection.port,
            name: conn.connection.name
        });

    } catch (error) {
        console.error('MongoDB connection error:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        throw error;
    }
}