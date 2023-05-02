import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User";
import { Game } from "./models/Game";
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
    "mongodb://psi001:psi001@localhost:27017/psi001?retryWrites=true&authSource=psi001"
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

app.get("/api/login", async (req, res) => {
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
  let title = req.query.term;
  if (typeof title !== 'string'){
    res.status(404).json({ error: 'Formato de titulo errado' });
    return;
  }
  let partial = new RegExp(title, "i");
  Game.find({title: partial}, function(err, found){
    if(found){
      res.send(found);
    }
    else{
      res.send("Nenhum jogo encontrado.");
    }
  });
});
