import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
