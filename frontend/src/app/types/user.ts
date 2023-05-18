export interface List {
  name: string;
  items: number[];
}

export interface ItemData {
  id: number;
  name: string;
  image: string;
  type: string;
  timeOfPurchase: number;
}

export interface UserData {
  displayName: string;
  avatar: string;
  items: ItemData[];
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
