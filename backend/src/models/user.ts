import * as mongoose from "mongoose";

export interface IList {
	name: string;
	items: number[];
}

export interface IUserData {
	avatar: Buffer;
	games: number[];
	lists: IList[];
	following: string[];
	followers: string[];
}

interface IUser extends mongoose.Document {
	_id: string;
	passwordHash: string;
	userData: IUserData;
}

const listSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	items: {
		type: [Number],
		required: true,
	},
});

const userDataSchema = new mongoose.Schema({
	avatar: {
		type: Buffer,
		required: true,
	},
	games: {
		type: [Number],
		required: true,
	},
	lists: {
		type: [listSchema],
		required: true,
	},
	following: {
		type: [String],
		required: true,
	},
	followers: {
		type: [String],
		required: true,
	},
});

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	userData: {
		type: userDataSchema,
		required: true,
	},
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
