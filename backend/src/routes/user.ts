import express from "express";
import User from "../models/user";

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

user_router.put("/:username/cart/:gameID", async (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.params.username)
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      console.log(req.params.gameID);
      const gameID = parseInt(req.params.gameID);
      console.log(gameID);
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

// user_router.get("/:username/avatar", async (req, res) => {
// 	if (!req.session?.username) {
// 		return res.status(401).json({ message: "Unauthorized" });
// 	}

// 	User.findOne({ _id: req.params.username })
// 		.then((user) => {
// 			if (user == null) {
// 				return res.status(404).json({ message: "Cannot find user" });
// 			}

// 			// Check if the user has an avatar
// 			if (!user.userData?.avatar) {
// 				return res.status(404).json({ message: "User has no avatar" });
// 			}

// 			// Convert the avatar buffer to a base64-encoded data URL
// 			const base64Avatar = Buffer.from(user.userData.avatar).toString(
// 				"base64"
// 			);
// 			const avatarUrl = `data:image/png;base64,${base64Avatar}`;

// 			// Return the avatar URL in the response
// 			res.json({ avatarUrl });
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ message: err.message });
// 		});
// });

export { user_router };
