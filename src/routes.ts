import * as Admin from './services/Admin/index';
import * as List from './services/Buy-List/index';
import * as Product from './services/Product/index';
import * as Review from './services/Review/index';
import * as Theme from './services/Theme/index';
import * as User from './services/User/index';
// -------------------Admin -----------------------------
Admin.getAllUsers;
Admin.blockUser;
// -------------------Review -----------------------------
Review.createReview;
Review.getReviews;
// -------------------Theme -----------------------------
Theme.getTheme;
Theme.updateTheme;
// -------------------BuyList -----------------------------
List.getItems;
List.AddItems;
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
