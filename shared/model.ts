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

export interface IOrder {
  order: IOrderArray[];
  userid: string;
  type: string;
}
export interface IOrderArray {
  date?: string;
  image: IProductImage[];
  name: string;
  price: number;
  product_id: string;
  qty: number;
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
export interface ICart {
  name: string;
  description: string;
  quantity: number;
  price: number;
  details: object;
  image: IProductImage[];
  type: string;
  product_id: string;
  qty: number;
}
export interface ICartSize {
  cartsize: number;
}
export interface IWishItem {
  name: string;
  description: string;
  quantity: number;
  price: number;
  details: object;
  image: IProductImage[];
  type: string;
  product_id: string;
}
export interface IProductImage {
  imageurl: string;
}
export interface ICartItem {
  type: string;
  userid: string;
  cartitems: ICartArray[];
}
export interface ICartArray {
  product_id: string;
  qty: number;
}
export interface IWishList {
  type: string;
  userid: string;
  wishlistitems: IWishListArray[];
}
export interface IWishListArray {
  product_id: string;
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
