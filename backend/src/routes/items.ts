import express from "express";
import { Game } from "../models/game";

const items_router = express.Router();

items_router.get("/search", async (req, res) => {
	let title = req.query.title;
	if (typeof title !== "string") {
		res.status(404).json({ error: "Formato de titulo errado" });
		return;
	}
	let partial = new RegExp(title, "i");

	let found = await getGames(partial);

	if (found) {
		return res.send(found);
	} else {
		return res.send("Nenhum jogo encontrado.");
	}
});

async function getGames(partial: RegExp) {
	let found = Game.find({ title: partial });
	return found;
}

export { items_router };
