import * as mongoose from "mongoose";

interface IAvatar extends mongoose.Document {
	url: String;
}

const avatarSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

const Avatar = mongoose.model<IAvatar>("Avatar", avatarSchema);

export default Avatar;