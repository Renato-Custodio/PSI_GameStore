import * as mongoose from "mongoose";

interface IItem extends mongoose.Document {
	name: string;
	type: string;
	description: string;
	platform: string;
	language: string;
	price: string;
	general_classification: string;
	evaluations: [Ievaluation];
	main_image: string;
	image1: string;
	image2: string;
	background_image: string;
	video_link: string;
}

interface Ievaluation extends mongoose.Document {
	classification: number,
	comment: string
}

const evaluationSchema = new mongoose.Schema({
	classification: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		maxlength: 5000
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
		type: String,
		required: true
	},
	general_classification: {
		type: String,
		required: true
	},
	evaluations: {
		type: [evaluationSchema],
		required: true
	},
	main_image: {
		type: String,
		required: true
	},
	image1: {
		type: String
	},
	image2: {
		type: String
	},
	background_image: {
		type: String
	},
	link: {
		type: String
	}
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
