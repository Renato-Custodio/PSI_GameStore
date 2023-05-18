import * as mongoose from "mongoose";

export interface IItem extends mongoose.Document {
	name: string;
	type: string;
	description: string;
	platform: string;
	language: string;
	price: number;
	general_classification: number;
	evaluations: IEvaluation[];
	main_image: string;
	image1: string;
	image2: string;
	background_image: string;
	video_link: string;
}

export interface IEvaluation extends mongoose.Document {
	userID: string;
	stars: number;
	comment: string;
}

const evaluationsSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	stars: {
		type: Number,
		required: true
	},
	comment: {
		type: String
	}
});

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
		type: Number,
		required: true
	},
	evaluations: {
		type: [evaluationsSchema],
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
