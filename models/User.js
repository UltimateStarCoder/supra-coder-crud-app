import mongoose from 'mongoose';

// Delete User model if it exists to prevent overwrite error
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;