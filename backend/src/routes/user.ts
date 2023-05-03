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

user_router.get("/:username", async (req, res) => {
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

export { user_router };
