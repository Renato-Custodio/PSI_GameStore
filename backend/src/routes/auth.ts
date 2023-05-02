import express, { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, validatePassword, validateUsername } from "../utils";

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
			console.log(user);
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

export { auth_router };
