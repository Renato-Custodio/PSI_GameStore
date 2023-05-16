import * as mongoose from "mongoose";

export interface IList extends mongoose.Document {
	name: string;
	items: number[];
}

export interface IUserData extends mongoose.Document {
	displayName: string;
	avatar: string;
	games: number[];
	wishlist: number[];
	lists: IList[];
	following: string[];
	followers: string[];
	cart: number[];
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
	displayName: {
		type: String,
		required: false,
	},
	avatar: {
		type: String,
		required: false,
	},
	games: {
		type: [Number],
		required: false,
	},
	wishlist: {
		type: [Number],
		required: false,
	},
	lists: {
		type: [listSchema],
		required: false,
	},
	following: {
		type: [String],
		required: false,
	},
	followers: {
		type: [String],
		required: false,
	},
	cart: {
		type: [Number],
		required: false,
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
		required: false,
	},
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
