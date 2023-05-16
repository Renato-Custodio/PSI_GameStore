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


export { user_router };
