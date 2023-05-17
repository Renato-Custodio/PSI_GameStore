export interface List {
  name: string;
  items: number[];
}

export interface GameData {
  id: number;
  name: string;
  image: string;
  timeOfPurchase: number;
}

export interface UserData {
  displayName: string;
  avatar: string;
  games: GameData[];
  wishList: number[];
  lists: List[];
  following: string[];
  followers: string[];
  cart: number[];
}

export interface User {
  error: any;
  _id: string;
  passwordHash: string;
  userData: UserData;
}
