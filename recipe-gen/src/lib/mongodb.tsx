import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB connected!");
    } catch (err) {
        console.log("Error connecting", err);
    }
}