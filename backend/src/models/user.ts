import * as mongoose from "mongoose";

interface IUser extends mongoose.Document {
	username: string;
	passwordHash: string;
}

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
