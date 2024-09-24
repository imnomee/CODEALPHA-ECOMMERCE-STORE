import mongoose from 'mongoose'; // Import Mongoose library
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String, // Username of the user
            required: true, // Username is required
            minLength: [3, 'Username must be at least 3 characters long'], // Minimum length validation (corrected from 'minLengh')
        },
        userEmail: {
            type: String, // Email of the user
            required: true, // Email is required
            unique: true, // Email must be unique
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email format validation
        },
        userPassword: {
            type: String, // Password of the user
            required: true, // Password is required
            minlength: [8, 'Password must be at least 8 characters long'], // Minimum length validation
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Pre-save middleware to hash passwords before saving
userSchema.pre('save', async function (next) {
    // Check if password is modified
    if (!this.isModified('userPassword')) return next();

    const salt = await bcrypt.genSalt(10); // Generate salt
    this.userPassword = await bcrypt.hash(this.userPassword, salt); // Hash password
    next(); // Proceed to save
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.userPassword); // Compare entered password with hashed password
};

// Export the User model
export default mongoose.model('User', userSchema);
