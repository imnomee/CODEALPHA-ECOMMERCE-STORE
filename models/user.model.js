import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            minLengh: [3, 'Username must be at least 3 characters long'],
        },
        userEmail: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        },
        userPassword: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters long'],
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to hash passwords before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('userPassword')) return next();
    const salt = await bcrypt.genSalt(10);
    this.userPassword = await bcrypt.hash(this.userPassword, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.userPassword);
};
