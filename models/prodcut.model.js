import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true,
            minLength: [10, 'Name must be at least 10 character long'],
            maxLength: [50, 'Name cannot exceed 50 characters'],
        },
        productDescn: {
            type: String,
            required: true,
            minLength: [30, 'Description must be at least 30 character long'],
            maxLength: [500, 'Description cannot exceed 500 characters'],
        },
        productPrice: {
            type: Number,
            required: true,
            min: [1, 'Price must be greater than 1'],
        },
        productStock: {
            type: Number,
            required: true,
            min: 0,
        },
        productImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Product', productSchema);
