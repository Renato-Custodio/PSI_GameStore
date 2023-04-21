import express, { Request, Response } from "express";
import User from "../models/user";
import { hashPassword } from "../utils";

const auth_router = express.Router();

auth_router.post("/register", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const passwordHash = await hashPassword(password);

	const user = new User({
		_id: username,
		passwordHash: passwordHash,
	});

	user.save()
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			if (err.code === 11000) {
				res.status(400).json({ error: "Username already taken" });
			} else {
				res.status(500).json({ error: "Something went wrong" });
			}
		});
});

export { auth_router };
