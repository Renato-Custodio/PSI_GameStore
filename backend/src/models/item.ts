import * as mongoose from "mongoose";

interface IItem extends mongoose.Document {
	name: string;
    type: string;
    description: string;
    platform: string;
    language: string;
    price: string;
    general_Classification: string;
    avaluations: string;
}

const itemSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
    name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
    description: {
		type: String,
        maxlength: 1000,
		required: true,
	},
    platform: {
		type: String,
		required: true,
	},
    language: {
		type: String,
		required: true,
	},
    price: {
		type: String,
		required: true,
	},
    general_Classification: {
		type: String,
		required: true,
	},
    avaluations: {
		type: String,
		required: true,
	},
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
