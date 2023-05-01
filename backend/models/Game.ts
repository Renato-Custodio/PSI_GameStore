import mongoose from "mongoose";

export const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    release_date: { type: Date, required: true, unique: false },
    developer: {type: String, required: true}
  })
);
