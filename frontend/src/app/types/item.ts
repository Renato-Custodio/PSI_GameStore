export interface Item {
  _id: number;
  name: string;
  type: string;
  description: string;
  platform: string;
  language: string;
  price: number;
  general_classification: number;
  evaluations: Evaluations[];
  main_image: string;
  image1: string;
  image2: string;
  background_image: string;
  video_link: string;
}

export interface Evaluations {
  userID: string;
  stars: number;
  comment: string;
}

