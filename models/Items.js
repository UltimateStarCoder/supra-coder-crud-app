import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: String,
    quantity: Number,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Item = model('Item', itemSchema);