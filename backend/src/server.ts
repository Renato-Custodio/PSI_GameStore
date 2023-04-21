if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import { auth_router } from "./routes/auth";

const app = express();

mongoose.connect(process.env.MONGO_URI!, {});

mongoose.connection.on("connected", () => {
	console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
	console.error("Failed to connect to database:", err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", auth_router);

app.listen(3051, () => {
	console.log(`Server is running on port 3051`);
});
