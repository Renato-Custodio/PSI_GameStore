export interface List {
  name: string;
  items: number[];
}

export interface UserData {
  displayName: string;
  avatar: string;
  games: number[];
  wishList: number[];
  lists: List[];
  following: string[];
  followers: string[];
  cart: number[];
}

export interface User{
  error: any;
  _id: string;
  passwordHash: string;
  userData: UserData;
}
