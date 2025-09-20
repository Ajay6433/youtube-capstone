import mongoose from 'mongoose';

//Connecting the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // The process.exit(1) method in Node.js is used to terminate the Node.js process immediately and synchronously with a failure exit code of 1. This is distinct from process.exit(0), which indicates a successful termination.
        process.exit(1);
    }
};

export default connectDB;
