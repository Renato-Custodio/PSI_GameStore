import * as mongoose from "mongoose";

export interface IList {
	name: string;
	items: number[];
}

export interface UserData {
	avatar: Buffer;
	games: number[];
	lists: IList[];
	following: string[];
	followers: string[];
}


