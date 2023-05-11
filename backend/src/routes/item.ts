import express, { Request, Response } from "express";
import Item from "../models/item";

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

item_router.put("/:id/evaluations", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const newEvaluations = req.body.evaluations;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Cannot find item" });
    }

    // Update the evaluations

    for(const element of newEvaluations){
      item.evaluations.push(element);
    }

    // Save the updated item
    const updatedItem = await item.save();

    res.json(updatedItem.evaluations);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

item_router.put("/:name/evaluations", async (req: Request, res: Response) => {
  const itemName = req.params.name;
  const newEvaluations = req.body.evaluations;

  try {
    const item = await Item.findOne({ name:itemName });

    if (!item) {
      return res.status(404).json({ message: "Cannot find item" });
    }

    // Update the evaluations

    for(const element of newEvaluations){
      item.evaluations.push(element);
    }

    // Save the updated item
    const updatedItem = await item.save();

    res.json(updatedItem.evaluations);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

item_router.get("/:id/evaluations", async (req: Request, res: Response) => {

  Item.findById(req.params.id)
  .then((item) => {
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
    res.json(item.evaluations);
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

item_router.get("/:name/evaluations", async (req: Request, res: Response) => {
  Item.findOne({ name: req.params.name })
    .then((item) => {
      if (item == null) {
        return res.status(404).json({ message: "Cannot find item" });
      }
      res.json(item.evaluations);
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
	    main_image,
	    image1,
	    image2,
	    background_image,
	    video_link,
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
	    main_image,
	    image1,
	    image2,
	    background_image,
	    video_link,
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

async function getGames(partial: RegExp) {
	let found = Item.find({ name: partial });
	return found;
}

export { item_router };
