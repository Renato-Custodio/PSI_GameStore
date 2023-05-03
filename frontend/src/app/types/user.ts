export interface List {
  name: string;
  items: number[];
}

export interface UserData {
  // avatar: string;
  games: number[];
  lists: List[];
  following: string[];
  followers: string[];
}

export interface User{
  _id: string;
  passwordHash: string;
  userData: UserData;
}
