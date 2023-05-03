if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";

import { auth_router } from "./routes/auth";
import { item_router } from "./routes/item";

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
app.use(
	cookieSession({
		name: "session",
		keys: ["supersecretpassword"],

		// Cookie Options
		maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
	})
);

app.use("/auth", auth_router);
app.use("/item", item_router);
app.use("/cart", item_router);

app.use("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
