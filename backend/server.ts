import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: ["supersecretpassword"],

    // Cookie Options
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  })
);

// Connect to MongoDB
const connectDB = async () => {
  const result = await mongoose.connect(
    "mongodb://127.0.0.1:27017/projeto?retryWrites=true&w=majority"
  );
  if (!result) {
    console.log("Failed to connect to MongoDB");
    return;
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });
};
connectDB();

// Routes
app.get("/api", (req, res) => {
  res.send("Hello, world!");
});

app.post("/api/create-account", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, passwordHash });
  const savedUser = await user.save();
  res.send(savedUser);
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (user == null)
    return res.send({
      error: `A combinação username/password está incorreta!`,
    });

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return res.send({
      error: `A combinação username/password está incorreta!`,
    });
  }

  const { passwordHash, ...userWithoutPassword } = user;

  // Create a session for this user
  req.session = { ...req.session, username };

  return res.send(userWithoutPassword);
});

app.get("/api/testlogin", async (req, res) => {
  // If the user is not authenticated, send an error
  if (!req.session?.username) {
    return res.send({ error: "You are not logged in." });
  }

  // Otherwise, extract the username and do whatever with it
  const { username } = req.session;

  // Send response back
  return res.send(`${username} is logged in.`);
});

app.get("/api/search", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.send("You need a search query.");
  }

  return res.send([
    { title: `Cyberpunk`, year: `2022` },
    { title: `Mario Brothers`, year: `1990` },
    { title: `Counter-Strike`, year: `2001` },
    { title: `League of Legends`, year: `2003` },
  ]);
});
