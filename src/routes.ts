import * as Admin from './services/Admin/index';
import * as BuyList from './services/Buy-List/index';
import * as Cart from './services/Cart/index';
import * as Order from './services/Order/index';
import * as Product from './services/Product/index';
import * as Review from './services/Review/index';
import * as Theme from './services/Theme/index';
import * as User from './services/User/index';
import * as WishList from './services/Wish-List/index';

// -------------------Admin -----------------------------
Admin.getAllUsers;
Admin.blockUser;
// -------------------WishList -----------------------------
WishList.clearWishList;
WishList.addItems;
WishList.getWishListItems;
WishList.removeItem;
// -------------------Order -----------------------------
Order.createOrder;
Order.deleteOrder;
Order.getAllOrders;
Order.getUserOrder;
// -------------------Review -----------------------------
Review.createReview;
Review.getReviews;
// -------------------Theme -----------------------------
Theme.getTheme;
Theme.updateTheme;
// -------------------BuyList -----------------------------
BuyList.getItems;
BuyList.AddItems;
// -------------------User -----------------------------
User.Login;
User.contactUs;
User.createUser;
User.forgotPassword;
User.getUser;
User.updateUser;
// -------------------Product -----------------------------
Product.createProduct;
Product.deleteProduct;
Product.getAllProducts;
Product.getProduct;
Product.getProductByCategory;
Product.updateProduct;
// -------------------Cart -----------------------------
Cart.clearCart;
Cart.addItems;
Cart.getItems;
Cart.getSize;
Cart.removeItem;
Cart.updateCart;
