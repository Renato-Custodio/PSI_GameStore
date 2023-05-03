import * as mongoose from "mongoose";

interface IItem extends mongoose.Document {
	name: string;
	type: string;
	description: string;
	platform: string;
	language: string;
	price: string;
	general_classification: string;
	evaluations: string;
	main_image: Buffer;
	image1: Buffer;
	image2: Buffer;
	video_link: string;
}

const itemSchema = new mongoose.Schema({
	_id: {
		type: String,
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
		type: String,
		required: true
	},
	imagem_Principal: {
		image: Buffer
		/* required: true */
	},
	imagem1: {
		image: Buffer
	},
	imagem2: {
		image: Buffer
	},
	link: {
		type: String
	}
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
