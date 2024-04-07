import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import favProductsModel from "../models/favProductsModel.js";
import { invoiceTemplate, sendMail } from "../Services/common.js";
import productReviewModel from "../models/productReviewModel.js";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//creating product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping, brand } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ err: "Name is required" });
      case !description:
        return res.status(400).send({ err: "Description is required" });
      case !price:
        return res.status(400).send({ err: "Price is required" });
      case !category:
        return res.status(400).send({ err: "Category is required" });
      case !quantity:
        return res.status(400).send({ err: "Quantity is required" });
      case !shipping:
        return res.status(400).send({ err: "Shipping is required" });
      case !brand:
        return res.status(400).send({ err: "Brand is required" });
      case !photo || photo.size > 1000000:
        return res
          .status(400)
          .send({ err: "photo is required and should be less than 1 mb" });
    }
    const existingProduct = await productModel.findOne({ name });

    if (existingProduct) {
      return res.status(200).send({
        success: false,
        message: "Product already exist",
      });
    }

    const product = new productModel({
      ...req.fields,
      rating: 0,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "product created Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in creating product",
    });
  }
};

//creating cloth product
export const createClothProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      brand,
      colors,
      sizes,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ err: "Name is required" });
      case !description:
        return res.status(400).send({ err: "Description is required" });
      case !price:
        return res.status(400).send({ err: "Price is required" });
      case !category:
        return res.status(400).send({ err: "Category is required" });
      case !quantity:
        return res.status(400).send({ err: "Quantity is required" });
      case !shipping:
        return res.status(400).send({ err: "Shipping is required" });
      case !brand:
        return res.status(400).send({ err: "Brand is required" });
      case !colors:
        return res.status(400).send({ err: "Colors is required" });
      case !sizes:
        return res.status(400).send({ err: "Sizes is required" });
      case !photo || photo.size > 1000000:
        return res
          .status(400)
          .send({ err: "photo is required and should be less than 1 mb" });
    }
    const existingProduct = await productModel.findOne({ name });

    if (existingProduct) {
      return res.status(200).send({
        success: false,
        message: "Product already exist",
      });
    }
    let cols = colors.split(",");
    let sizs = sizes.split(",");

    const product = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      brand,
      colors: cols,
      sizes: sizs,
      rating: 0,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "product created Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in creating product",
    });
  }
};

//upload product multiple images
export const uploadProductImages = async (req, res) => {
  try {
    const { prodImage, prodId } = req.body;

    //validation
    switch (true) {
      case !prodImage:
        return res.status(400).send({ err: "Product Images is required" });
      case !prodId:
        return res.status(400).send({ err: "Product Id is required" });
    }

    const existingProduct = await productModel.findById({ _id: prodId });
    if (existingProduct) {
      if (existingProduct.productImages.length < 4) {
        const newProduct = await productModel.findOneAndUpdate(
          { _id: prodId },
          { $push: { productImages: prodImage } },
          { new: true }
        );
        return res.status(200).send({
          success: true,
          message: "product images uploaded Successfully",
          newProduct,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Upload Maximum 4 images",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in uploading product images",
    });
  }
};

//getting products
export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products list",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting product",
    });
  }
};

//getting single product
export const getProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await productModel
      .findOne({ slug: slug })
      .select("-photo")
      .populate("category");

    if (product) {
      res.status(200).send({
        success: true,
        message: "Product found",
        product,
      });
    } else {
      res.status(400).send({
        success: fasle,
        message: "Product not found",
        product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting single product",
    });
  }
};

//getting photo of product
export const getProductPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting photo of product",
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id).select("-photo");
    return res.status(200).send({ success: true, message: "deleted product" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in deleting product",
    });
  }
};

//update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, quantity, shipping, brand } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ err: "Name is required" });
      case !description:
        return res.status(400).send({ err: "Description is required" });
      case !price:
        return res.status(400).send({ err: "Price is required" });
      case !category:
        return res.status(400).send({ err: "Category is required" });
      case !quantity:
        return res.status(400).send({ err: "Quantity is required" });
      case !brand:
        return res.status(400).send({ err: "Brand is required" });
      case !shipping:
        return res.status(400).send({ err: "Shipping is required" });
      // case !photo || photo.size > 1000000:
      //   return res
      //     .status(400)
      //     .send({ err: "photo is required and should be less than 1 mb" });
    }
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "product updated Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in updating product",
    });
  }
};

//filter product
export const filterProduct = async (req, res) => {
  try {
    const { checked, radio, brandsRadio } = req.body;
    let args = {};
    if (checked?.length > 0) args.category = checked;
    if (radio?.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    if (brandsRadio) args.brand = brandsRadio;
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in filtering products",
    });
  }
};

export const getProductByCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({ success: true, total });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in counting products",
    });
  }
};

//get product per page
export const productByPage = async (req, res) => {
  try {
    const { checked, radio, brandsRadio } = req.body;
    let args = {};
    if (checked?.length > 0) args.category = checked;
    if (radio?.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    if (brandsRadio) args.brand = brandsRadio;
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in products per page",
    });
  }
};

//get product per page
export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in search product",
    });
  }
};

//get similar product
export const similarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({ succes: true, products });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in similar product",
    });
  }
};

//get category of product
export const getProductByCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel
      .find({ category: category._id })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in product by category ",
    });
  }
};

//create or remove favourite product
export const createFavouriteProduct = async (req, res) => {
  try {
    const { user, product } = req.body;
    //validation
    switch (true) {
      case !user:
        return res.status(400).send({ err: "User is required" });
      case !product:
        return res.status(400).send({ err: "Product is required" });
    }
    let existingUserList = await favProductsModel.findOne({ user });
    if (!existingUserList) {
      const favProduct = new favProductsModel({ user: user });
      await favProduct.save();
      let newFavProducts = await favProductsModel
        .findOneAndUpdate(
          { user },
          { $push: { productsList: product } },
          { new: true }
        )
        .populate("productsList");
      return res.status(201).send({
        success: true,
        message: "fav product added Successfully",
        newFavProducts,
      });
    }
    if (existingUserList) {
      const existingProduct = await favProductsModel.findOne({
        user,
        productsList: { $in: [product] },
      });
      if (existingProduct) {
        let newFavProducts = await favProductsModel
          .findOneAndUpdate(
            { user },
            { $pull: { productsList: product } },
            { new: true }
          )
          .populate("productsList");
        return res.status(200).send({
          success: true,
          message: "fav product removed Successfully",
          newFavProducts,
        });
      }
      let newFavProducts = await favProductsModel
        .findOneAndUpdate(
          { user: user },
          { $push: { productsList: product } },
          { new: true }
        )
        .populate("productsList");
      return res.status(201).send({
        success: true,
        message: "fav product added Successfully",
        newFavProducts,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in creating or deleting fav product",
    });
  }
};

//user updating rating

export const updateRatingByUser = async (req, res) => {
  try {
    //todo if user is already buyed the product

    const { uid, pid } = req.params;
    let { rating } = req.body;
    if (rating) rating = +rating;

    //validation
    switch (true) {
      case !uid:
        return res.status(400).send({ err: "UserId is required" });
      case !pid:
        return res.status(400).send({ err: "ProductId is required" });
      case !rating:
        return res.status(400).send({ err: "Rating is required" });
    }
    let product = await productModel.findById(pid);
    if (product) {
      if (product.rating === 0) {
        if (!product.ratingCount) {
          product = await productModel
            .findByIdAndUpdate(pid, { rating }, { new: true })
            .select("-photo");
          product = await productModel
            .findByIdAndUpdate(
              pid,
              { $push: { ratingCount: uid } },
              { new: true }
            )
            .select("-photo");

          return res.status(200).send({
            success: true,
            message: "product rating updated Successfully",
            product,
          });
        } else {
          product = await productModel
            .findByIdAndUpdate(pid, { rating }, { new: true })
            .select("-photo");
          product = await productModel
            .findByIdAndUpdate(
              pid,
              { $push: { ratingCount: uid } },
              { new: true }
            )
            .select("-photo");

          return res.status(200).send({
            success: true,
            message: "product rating updated Successfully",
            product,
          });
        }
      } else if (!product.rating || product.rating === undefined) {
        product = await productModel
          .findByIdAndUpdate(pid, { rating }, { new: true })
          .select("-photo");
        product = await productModel
          .findByIdAndUpdate(
            pid,
            { $push: { ratingCount: uid } },
            { new: true }
          )
          .select("-photo");

        return res.status(200).send({
          success: true,
          message: "product rating updated Successfully",
          product,
        });
      } else {
        let findUser = await productModel
          .findOne({
            _id: pid,
            ratingCount: { $in: uid },
          })
          .select("-photo");
        if (!findUser || findUser === undefined) {
          let newRating = (product.rating + rating) / 2;
          product = await productModel
            .findByIdAndUpdate(pid, { rating: newRating }, { new: true })
            .select("-photo");
          product = await productModel
            .findByIdAndUpdate(
              pid,
              { $push: { ratingCount: uid } },
              { new: true }
            )
            .select("-photo");

          return res.status(200).send({
            success: true,
            message: "product rating updated Successfully",
            product,
          });
        } else {
          return res.status(200).send({
            success: false,
            message: "You already rated this product",
          });
        }
      }
    }

    res.status(200).send({
      success: true,
      message: "product rating updated Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in updating product",
    });
  }
};

//get product rating
export const getRatingOfProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    //validation
    switch (true) {
      case !pid:
        return res.status(400).send({ err: "ProductId is required" });
    }

    let product = await productModel.findById(pid);
    if (product) {
      if (product.rating === 0) {
        if (
          product.ratingCount === null ||
          product.ratingCount === undefined ||
          !product.ratingCount
        ) {
          return res.status(200).send({
            success: true,
            message: "got product rating Successfully",
            productRating: product.rating,
            productRatingCount: 0,
          });
        }
        if (product.ratingCount) {
          return res.status(200).send({
            success: true,
            message: "got product rating Successfully",
            productRating: product.rating,
            productRatingCount: product.ratingCount.length,
          });
        }
      } else if (!product.rating || product.rating === undefined) {
        return res.status(200).send({
          success: true,
          message: "got product rating Successfully",
          productRating: 0,
          productRatingCount: 0,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "got product rating Successfully",
          productRating: product.rating,
          productRatingCount: product.ratingCount.length,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "product not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in updating product",
    });
  }
};

//get favourite product
export const getSingleFavProduct = async (req, res) => {
  try {
    const { user, product } = req.params;
    //validation
    switch (true) {
      case !user:
        return res.status(400).send({ err: "User is required" });
      case !product:
        return res.status(400).send({ err: "Product is required" });
    }
    let existingProduct = await favProductsModel
      .findOne({ user, productsList: { $in: product } })
      .populate("productsList");
    if (existingProduct) {
      return res.status(200).send({
        success: true,
        message: "got fav product Successfully",
        existingProduct,
      });
    }
    if (!existingProduct) {
      return res.status(200).send({
        success: true,
        message: "fav product doesn't exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting single fav product",
    });
  }
};

//get all favourite product
export const getAllFavProducts = async (req, res) => {
  try {
    const { user } = req.params;
    //validation
    switch (true) {
      case !user:
        return res.status(400).send({ err: "User is required" });
    }
    let allExistingProduct = await favProductsModel
      .findOne({ user })
      .populate("productsList");
    if (allExistingProduct) {
      return res.status(200).send({
        success: true,
        message: "got all fav product Successfully",
        allExistingProduct,
      });
    }
    if (!allExistingProduct) {
      return res.status(200).send({
        success: true,
        message: "fav product doesn't exist please add",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting all fav product",
    });
  }
};

//payment gateway api
//token
export const getBraintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting payment token ",
    });
  }
};

//payment
export const braintreePayment = async (req, res) => {
  try {
    const { cart, nonce, totalCartPrice } = req.body;
    // let total = 0;
    // cart.map((i) => {
    //   total = +i.price;
    // });
    // console.log("new total", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: totalCartPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          let order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
            status: "Not Process",
          });
          order = await order.save();
          if (order) {
            sendMail({
              to: req.user.email,
              html: invoiceTemplate(order),
              subject: "Thankyou for ordering",
            });
            return res.status(200).send({
              success: true,
              message: "Order placed successfully",
              order,
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Order Not placed",
            });
          }
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in Payment by Braintree ",
    });
  }
};

//add review to products
export const createUserProductReview = async (req, res) => {
  try {
    const { userId, productId, comment } = req.body;
    //validation
    switch (true) {
      case !userId:
        return res.status(400).send({ err: "User is required" });
      case !productId:
        return res.status(400).send({ err: "Product is required" });
      case !comment:
        return res.status(400).send({ err: "Comment is required" });
    }
    let existingProductList = await productReviewModel.findOne({ productId });
    if (!existingProductList) {
      const productReview = new productReviewModel({ productId: productId });
      await productReview.save();
      let newProductReview = await productReviewModel.findOneAndUpdate(
        { productId },
        { $push: { users: userId } },
        { new: true }
      );
      newProductReview = await productReviewModel
        .findOneAndUpdate(
          { productId },
          { $push: { comment: comment } },
          { new: true }
        )
        .populate("users")
        .populate("productId");

      return res.status(201).send({
        success: true,
        message: "product Review added Successfully",
        newProductReview,
      });
    }
    if (existingProductList) {
      const existingProduct = await productReviewModel.findOne({
        productId,
        users: { $in: [userId] },
      });
      if (existingProduct) {
        return res.status(200).send({
          success: false,
          message: "you already added review",
        });
      }
      let newProductReview = await productReviewModel.findOneAndUpdate(
        { productId },
        { $push: { users: userId } },
        { new: true }
      );
      newProductReview = await productReviewModel
        .findOneAndUpdate(
          { productId },
          { $push: { comment: comment } },
          { new: true }
        )
        .populate("users")
        .populate("productId");

      return res.status(200).send({
        success: true,
        message: "product review added Successfully",
        newProductReview,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in adding comment in product",
    });
  }
};

//get review of product
export const getProductReview = async (req, res) => {
  try {
    const { pid } = req.params;
    //validation
    switch (true) {
      case !pid:
        return res.status(400).send({ err: "Product id is required" });
    }
    let productId = pid;
    let existingProductList = await productReviewModel.findOne({ productId });
    if (!existingProductList) {
      return res.status(200).send({
        success: false,
        message: "give product review",
      });
    }
    if (existingProductList) {
      const existingProduct = await productReviewModel
        .findOne({
          productId,
        })
        .populate("productId")
        .populate("users");

      return res.status(200).send({
        success: true,
        message: "product review found Successfully",
        existingProduct,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting comment in product",
    });
  }
};
