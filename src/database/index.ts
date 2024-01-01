import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DASHBOARD_URI!;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })