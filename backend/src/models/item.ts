import * as mongoose from "mongoose";

interface IItem extends mongoose.Document {
	name: string;
	type: string;
	description: string;
	platform: string;
	language: string;
	price: number;
	general_classification: string;
	evaluations: string;
	main_image: string;
	image1: string;
	image2: string;
	background_image: string;
	video_link: string;
}

const itemSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
        maxlength: 1000,
		required: true
	},
	platform: {
		type: String,
		required: true
	},
	language: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	general_classification: {
		type: String,
		required: true
	},
	evaluations: {
		type: String,
		required: true
	},
	main_image: {
		image: String
		/* required: true */
	},
	image1: {
		image: String
	},
	image2: {
		image: String
	},
	background_image: {
		image: String
	},
	video_link: {
		type: String
	}
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
