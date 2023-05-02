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


item_router.post("/create", async (req: Request, res: Response) => {
  try {
    const {
      _id,
      name,
      type,
      description,
      platform,
      language,
      price,
      general_Classification,
      avaluations,
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
      general_Classification,
      avaluations,
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

export { item_router };
