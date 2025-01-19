import mongoose from 'mongoose'

export async function connectDB() {
    try {
        if (mongoose.connections[0].readyState) return
        
        const uri = process.env.MONGODB_URI
        if (!uri) throw new Error('MONGODB_URI is not defined')
        
        await mongoose.connect(uri)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}