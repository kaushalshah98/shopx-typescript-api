export interface IUser {
  name: string;
  email: string;
  night_theme: boolean;
  password: string;
  profilepic: string;
  role: string;
  status: boolean;
  type: string;
  userid: string;
}
export interface IMenu {
  name: string;
  icon?: string;
  url?: string;
  childs?: IMenu[];
}
export interface IBuyList {
  list: IListArray[];
  userid: string;
  type: string;
}
export interface IListArray {
  done: boolean;
  name: string;
}
export interface IReview {
  list: IReviewList[];
  product_id: string;
  type: string;
}
export interface IReviewList {
  name: string;
  review: string;
  userid: string;
}
export interface IProductItem {
  name: string;
  description: string;
  quantity: number;
  category: string;
  price: number;
  details: object;
  innercategory: string;
  image: IProductImage[];
  type: string;
  product_id: string;
}
export interface ICartItem {
  name: string;
  description: string;
  quantity: number;
  category: string;
  price: number;
  details: object;
  innercategory: string;
  image: IProductImage[];
  type: string;
  product_id: string;
  qty?: number;
}
export interface IProductImage {
  imageurl: string;
}
export interface IAuthor {
  name: string;
  image: string;
  description: string;
  profession: string;
}
export interface IProductReview {
  username: string;
  name: string;
  review: string;
}
export interface IItem {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
