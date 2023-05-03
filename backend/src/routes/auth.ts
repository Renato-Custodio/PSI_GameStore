import express, { Request, Response } from "express";
import User from "../models/user";
import {
	checkPassword,
	hashPassword,
	validatePassword,
	validateUsername,
} from "../utils";

const auth_router = express.Router();

auth_router.post("/register", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (
		!username ||
		!password ||
		!validatePassword(password) ||
		!validateUsername(username)
	) {
		return res.status(200).json({
			error: "Invalid username or password",
		});
	}

	const passwordHash = await hashPassword(password);

	const user = new User({
		_id: username,
		passwordHash: passwordHash,
	});

	user.save()
		.then((user) => {
			return res.status(200).json(user);
		})
		.catch((err) => {
			if (err.code === 11000) {
				// duplicate key error
				return res.status(200).json({
					error: "Username already exists",
				});
			} else {
				return res.status(500).json({
					error: "Internal server error",
				});
			}
		});
});

auth_router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ _id: username }).exec();

	if (user == null)
		return res.send({
			error: `A combinação username/password está incorreta!`,
		});

	const isCorrectPassword = checkPassword(password, user.passwordHash);
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

auth_router.get("/loggeduser", async (req, res) => {
	// If the user is not authenticated, send an error
	if (!req.session?.username) {
		return res.send({ error: "You are not logged in." });
	}

	// Otherwise, extract the username and do whatever with it
	const { username } = req.session;

	// Send response back
	return res.send({ username });
});

export { auth_router };
