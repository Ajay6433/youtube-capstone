// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Video from ".//src/models/Video.model.js";
// import videoData from "./DummyVideos.js"; // dummy data

// This file is made for seeding the videos to the backend for the development purpose

// dotenv.config();

// async function insertVideos() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB...");

//     // Insert videos
//     const result = await Video.insertMany(videoData);
//     console.log(`Inserted ${result.length} videos successfully.`);

//     // Close connection manually
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed.");

//   } catch (error) {
//     console.error("Error inserting videos:", error);
//     process.exit(1);
//   }
// }

// insertVideos();
