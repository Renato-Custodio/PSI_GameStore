import mongoose from "mongoose";

export interface ICart extends mongoose.Document {
	user: String;
    items: number[]
}

const cartSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	items: {
		type: [Number],
		required: true,
	},
});

const Cart = mongoose.model<ICart>("Item", cartSchema);

export default Cart;

