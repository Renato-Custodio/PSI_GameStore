import express, { Request, Response } from "express";

const item_router = express.Router();

item_router.get("/details", async (req: Request, res: Response) => {
    const { name } = req.body;
    
})

export { item_router };
