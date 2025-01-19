import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
