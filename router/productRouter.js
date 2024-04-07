import { Router } from "express";
import { isAdmin, signInAuthenticate } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getAllProduct,
  getProduct,
  getProductPhoto,
  deleteProduct,
  updateProduct,
  filterProduct,
  getProductByCount,
  productByPage,
  productSearch,
  similarProduct,
  getProductByCategory,
  getBraintreeToken,
  braintreePayment,
  createFavouriteProduct,
  getSingleFavProduct,
  getAllFavProducts,
  updateRatingByUser,
  getRatingOfProduct,
  createUserProductReview,
  getProductReview,
  uploadProductImages,
  createClothProduct,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.post(
  "/create-product",
  signInAuthenticate,
  isAdmin,
  ExpressFormidable(),
  createProduct
);
router.post(
  "/create-cloth-product",
  signInAuthenticate,
  isAdmin,
  ExpressFormidable(),
  createClothProduct
);
router.put(
  "/update-product/:id",
  signInAuthenticate,
  isAdmin,
  ExpressFormidable(),
  updateProduct
);
router.put("/update-rating/:uid/:pid", signInAuthenticate, updateRatingByUser);
router.get("/get-rating/:pid", getRatingOfProduct);
router.post(
  "/create-favourite-product",
  signInAuthenticate,
  createFavouriteProduct
);
router.get(
  "/get-favourite-product/:user/:product",
  signInAuthenticate,
  getSingleFavProduct
);

router.get(
  "/get-all-favourite-products/:user",
  signInAuthenticate,
  getAllFavProducts
);

router.post(
  "/create-user-comment",
  signInAuthenticate,
  createUserProductReview
);
router.get(`/get-product-comment/:pid`, getProductReview);

router.get("/get-all-product", getAllProduct);
router.get("/get-product/:slug", getProduct);
router.get("/product-photo/:id", getProductPhoto);
router.get("/product-count", getProductByCount);
router.get("/product-by-page/:page", productByPage);
router.get("/similar-product/:pid/:cid", similarProduct);
router.get("/search-product/:keyword", productSearch);
router.post("/product-filter", filterProduct);
router.get("/product-by-category/:slug", getProductByCategory);
//upload product images
router.put("/upload-product-images", uploadProductImages);

router.delete(
  "/delete-product/:id",
  signInAuthenticate,
  isAdmin,
  deleteProduct
);
//payment routes
//token
router.get("/braintree/token", getBraintreeToken);
router.post("/braintree/payment", signInAuthenticate, braintreePayment);

export default router;
