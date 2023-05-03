import express from "express";
import cart from "../models/cart";

const cart_router = express.Router();

cart_router.put("/:username/:item", async (req, res) => {
    try {
        const {
            user,
            items
          } = req.body;


        const newItem = new cart({
            user,
            items
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to create cart" });
    }

});

export { cart_router };