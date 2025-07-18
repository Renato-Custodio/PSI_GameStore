import express from "express";
import User, { IItemData } from "../models/user";
import Avatar from "../models/avatar";
import Item from "../models/item";

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

			const gameID = parseInt(req.params.gameID);

			// Check if the gameID is in the wishlist
			const index = user.userData.wishlist.indexOf(gameID);
			if (index === -1) {
				return res
					.status(400)
					.json({ message: "Game is not in the wishlist" });
			}

			// Remove the game from the wishlist
			user.userData.wishlist.splice(index, 1);

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

user_router.delete("/:username/cart/removeall/:gameID", async (req, res) => {
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

			// Remove all occurrences of gameID from the cart
			user.userData.cart = user.userData.cart.filter(
				(id) => id !== gameID
			);
			user.save();

			res.json(user.userData.cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

user_router.put("/cart/buy/card", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const user = await User.findById(req.session?.username);

		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}

		const { cardNumber, cardHolder, expirationDate, cvv, nif, address } =
			req.body;

		if (!cardNumber || !cardHolder || !expirationDate || !cvv || !nif) {
			return res.json({ message: "Missing card information" });
		}

		// For the sake of testing, the payment method has a 50% chance of failing
		if (Math.random() < 0.5) {
			return res.json({ message: "Payment failed" });
		}

		// Add games to user's library
		const addGamesPromises = user.userData.cart.map(async (gameID) => {
			const game = await Item.findById(gameID);

			if (game == null) {
				return res.status(404).json({ message: "Cannot find game" });
			}

			user.userData.wishlist = user.userData.wishlist.filter(
				(i) => i !== gameID
			);

			user.userData.items.push({
				id: gameID,
				name: game.name,
				image: game.main_image,
				type: game.type,
				timeOfPurchase: Date.now(),
			} as IItemData);
		});

		await Promise.all(addGamesPromises);

		// Empty the cart
		user.userData.cart = [];

		await user.save();

		res.json({});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

user_router.put("/cart/buy/mbway", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const user = await User.findById(req.session?.username);

		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}

		const { number, nif, address } = req.body;

		if (!number || !nif) {
			return res.json({ message: "Missing information" });
		}

		// For the sake of testing, the payment method has a 50% chance of failing
		if (Math.random() < 0.5) {
			return res.json({ message: "Payment failed" });
		}

		// Add games to the user's library
		const addGamesPromises = user.userData.cart.map(async (gameID) => {
			const game = await Item.findById(gameID);

			if (game == null) {
				return res.status(404).json({ message: "Cannot find game" });
			}

			user.userData.wishlist = user.userData.wishlist.filter(
				(i) => i !== gameID
			);

			const data = {
				id: gameID,
				name: game.name,
				image: game.main_image,
				type: game.type,
				timeOfPurchase: Date.now(),
			} as IItemData;

			user.userData.items.push(data);
		});

		await Promise.all(addGamesPromises);

		// Empty the cart
		user.userData.cart = [];

		await user.save();

		res.json({});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

user_router.put("/update", async (req, res) => {
	// Check if user is logged in
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const { displayName, avatar } = req.body;

	if (displayName.length < 3) {
		return res.send({
			error: "The name must contain at least 3 characters.",
		});
	}

	if (/[^a-zA-Z0-9]/.test(displayName)) {
		return res.send({
			error: "The name must only contain letters and numbers.",
		});
	}

	const name = await User.findOne({ "userData.displayName": displayName });
	if (name !== null) {
		return res.send({ error: `The displayname is already taken!` });
	}

	// Update username
	await User.findById(req.session.username)
		.then((user) => {
			if (user == null) {
				return res.status(404).json({ message: "Cannot find user" });
			}

			user.userData.displayName = displayName;
			user.userData.avatar = avatar;

			user.save();
			return res.send({ ok: "User updated!" });
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});
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

user_router.get("/items/:username", async (req, res) => {
	if (!req.session?.username) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const user = await User.findById(req.params.username);
		if (!user) {
			return res.status(404).json({ message: "Cannot find user" });
		}

		res.json(user.userData.items);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

export { user_router };
