import { Schema, model, models } from 'mongoose';

const itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

// Check if the model exists before compiling it
const Item = models.Item || model('Item', itemSchema);

export default Item;