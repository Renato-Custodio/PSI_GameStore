import express, { Request, Response } from "express";
import Item, { IEvaluation } from "../models/item";
import e from "express";

const item_router = express.Router();

item_router.get("/details/:id", async (req: Request, res: Response) => {

    Item.findById(req.params.id)
    .then((item) => {
      if (item == null) {
        return res.status(404).json({ message: "Cannot find item" });
      }
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// get item details by name
item_router.get("/details/:name", async (req: Request, res: Response) => {
  Item.findOne({ name: req.params.name })
    .then((item) => {
      if (item == null) {
        return res.status(404).json({ message: "Cannot find item" });
      }
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});


item_router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      _id,
      name,
      type,
      description,
      platform,
      language,
      price,
      general_classification,
      evaluations,
      imagem_Principal,
      imagem1,
      imagem2,
      link,
    } = req.body;

    const newItem = new Item({
      _id,
      name,
      type,
      description,
      platform,
      language,
      price,
      general_classification,
      evaluations,
      imagem_Principal,
      imagem1,
      imagem2,
      link,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// Get all items
item_router.get("/list", async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to get items" });
  }
});

item_router.get("/search", async (req, res) => {
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

item_router.put("/evaluate/:itemId", async (req: Request, res: Response) => {

  // if (!req.session?.username) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  try {
    const itemId = req.params.itemId;
    const { username, stars, comment } = req.body;

    // Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Cannot find item" });
    }
    
    if (!item.evaluations) {
      item.evaluations = [] as IEvaluation[];
    }

    if (item.general_classification == 0){
      item.general_classification = stars;
    } else {
      const newClassification = (+item.general_classification + +stars) / 2;
      item.general_classification = newClassification;
    }

    const evaluation = {
      userID: username,
      stars: stars,
      comment: comment,
    } as IEvaluation;

    // Add the evaluation to the item
    item.evaluations.push(evaluation);

    // Save the updated item
    const updatedItem = await item.save();

    res.json(updatedItem);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
});



async function getGames(partial: RegExp) {
	let found = Item.find({ name: partial });
	return found;
}

export { item_router };
