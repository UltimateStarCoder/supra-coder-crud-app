import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    createdBy: { type: String, required: [true, 'CreatedBy is required'] },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const Item = models.Item || model('Item', itemSchema);

export default Item;