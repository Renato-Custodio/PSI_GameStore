import express from "express";
import User from "../models/user";
import Avatar from "../models/avatar";

const user_router = express.Router();

user_router.get("/:username/lists", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData.lists);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.get("/:username/games", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData.games);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.get("/:username/followers", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData.followers);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.get("/:username/following", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData.following);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.get("/:username/data", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.put("/:username/cart/add/:gameID", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      const gameID = parseInt(req.params.gameID);
      if (user.userData.cart.includes(gameID)) {
        return res.status(409).json({ message: "Game already in cart" });
      }

      user.userData.cart.push(gameID);
      user.save();
      res.json(user.userData.cart);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.get("/:username/cart/length", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user.userData.cart.length);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.delete("/:username/cart/remove/:gameID", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      const gameID = parseInt(req.params.gameID);
      const index = user.userData.cart.indexOf(gameID);
      if (index === -1) {
        return res.status(404).json({ message: "Game not found in cart" });
      }

      user.userData.cart.splice(index, 1);
      user.save();
      res.json(user.userData.cart);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

user_router.put("/update/:username", async (req, res) => {
  // Check if user is logged in
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if new username is (actually) different
  if (req.session.username === req.params.username) {
    return res.send({ error: "The new username can't be the same as the old one!"});
  }

  // Find logged in user
  const user = await User.findOne({ _id: req.session.username }).exec();
  if (user === null) return res.send({ error: `Could not find user` });

  // Check if new username is available
  const name = await User.findOne({  _id: req.params.username });
  if (name !== null)
    return res.send({ error: `The username is already taken!` });

  // Update username
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { username: req.params.username },
    { new: true }
  ).lean();
  if (updatedUser == null) return res.send({ error: "An error ocurred when trying to update username!" });

  // Update user in session (otherwise, the user can't further change it's username)
  const { passwordHash, ...userWithoutPassword } = updatedUser;
  req.session = { ...req.session, ...userWithoutPassword };

  return res.send({ ok: "Username updated!" });
});

user_router.put("/update/:avatar", async (req, res) => {
  // Check if user is logged in
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({  _id: req.session.username }).exec();
  if (user == null) return res.send({ error: `Could not find user` });

  const avatar = req.params.avatar;

  const updatedAvatar = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      userData: {
        avatar: avatar,
      },
    },
    { new: true }
  ).lean();
  if (updatedAvatar == null)
    return res.send({ error: `Could not update avatar!` });

  return res.send({ ok: "Avatar updated!" });
});

user_router.get("/avatars", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  var avatars = await Avatar.find().distinct("url");
  res.json(avatars);
});

export { user_router };
