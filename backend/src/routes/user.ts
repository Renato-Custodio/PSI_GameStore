import express from "express";
import User from "../models/user";
import { validateCardChecksum } from "../utils";
import Avatar from "../models/avatar";
import { UserData } from "../../../frontend/src/app/types/user";

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
			res.json(user.userData.wishlist);
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

	if (req.params.username !== req.session.username) {
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

	if (req.params.username !== req.session.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	User.findById(req.params.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			const gameID = parseInt(req.params.gameID);
			if (user.userData.cart.includes(gameID)) {
				return res
					.status(409)
					.json({ message: "Game already in cart" });
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

	if (req.params.username !== req.session.username) {
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

user_router.put("/:username/wishlist/:gameID", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	User.findById(req.params.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}
			const gameID = parseInt(req.params.gameID);
			if (user.userData.wishlist.includes(gameID)) {
				return res.status(409).json({ message: "item already exists" });
			}
			user.userData.wishlist.push(gameID);
			user.save();
			res.json(user.userData.wishlist);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.delete("/:username/wishlist/:gameID", async (req, res) => {
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

			//muito roundabout mas com o $pull nao estava a conseguir
			var wishlist = [];
			while (user.userData.wishlist.length !== 0) {
				var game = user.userData.wishlist.pop();
				if (game !== gameID) {
					wishlist.push(game);
				}
			}
			while (wishlist.length !== 0) {
				var game = wishlist.pop();
				if (typeof game !== "undefined") {
					user.userData.wishlist.push(game);
				}
			}

			user.save();
			res.json(user.userData.wishlist);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

//add to caRT
user_router.put("/:username/cart/add/:gameID", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.params.username !== req.session.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	User.findById(req.params.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			const gameID = parseInt(req.params.gameID);
			if (user.userData.cart.includes(gameID)) {
				return res
					.status(409)
					.json({ message: "Game already in cart" });
			}

			user.userData.cart.push(gameID);
			user.save();
			res.json(user.userData.cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.delete("/:username/cart/remove/:gameID", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.params.username !== req.session.username) {
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
				return res
					.status(404)
					.json({ message: "Game not found in cart" });
			}

			user.userData.cart.splice(index, 1);
			user.save();
			res.json(user.userData.cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

//buy cart
user_router.put("/cart/buy/card", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	User.findById(req.session?.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			const cart = user.userData.cart;

			const { cardNumber, cardHolder, expirationDate, cvv } = req.body;

			if (!cardNumber || !cardHolder || !expirationDate || !cvv) {
				return res
					.status(400)
					.json({ message: "Missing card information" });
			}

			//checksum validation
			if (validateCardChecksum(cardNumber) === false) {
				return res.status(400).json({ message: "Invalid card" });
			}

			//for the sake of testing, the payment methode has a 50% chance of failing
			if (Math.random() < 0.5) {
				return res.status(500).json({ message: "Payment failed" });
			}

			//add games to user's library
			cart.forEach((gameID) => {
				user.userData.games.push(gameID);
			});

			//empty cart
			user.userData.cart = [];

			user.save();
			res.json(user.userData.games);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.put("/cart/buy/paypal", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	User.findById(req.session?.username)

		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			const { email, password } = req.body;

			if (!email || !password) {
				return res
					.status(400)
					.json({ message: "Missing paypal information" });
			}

			//for the sake of testing, the payment methode has a 50% chance of failing
			if (Math.random() < 0.5) {
				return res.status(500).json({ message: "Payment failed" });
			}

			//add games to user's library
			user.userData.cart.forEach((gameID) => {
				user.userData.games.push(gameID);
			});

			//empty cart
			user.userData.cart = [];

			user.save();
			res.json(user.userData.games);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.put("/update", async (req, res) => {
	// Check if user is logged in
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const { displayName, avatar } = req.body;

	// Update username
	const updatedUser = await User.findById(req.session.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			user.userData.displayName = displayName;
			user.userData.avatar = avatar;

			user.save();
			return user;
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});

	if (updatedUser == null)
		return res.send({
			error: "An error ocurred when trying to update username!",
		});

	return res.send({ ok: "Username updated!" });
});

user_router.get("/avatars", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	var avatars = await Avatar.find().distinct("url");
	res.json(avatars);
});

user_router.get("/avatar/:username", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	User.findById(req.params.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			res.json(user.userData.avatar);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.get("/displayname/:username", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	User.findById(req.params.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}
			res.json(user.userData.displayName);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

export { user_router };
