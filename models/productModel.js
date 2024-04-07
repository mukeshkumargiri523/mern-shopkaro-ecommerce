import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    productImages: [{ type: String }],
    rating: {
      type: Number,
      min: [0, "Minimum rating is 0"],
      max: [5, "Maximum rating is 5"],
      default: 0,
    },
    ratingCount: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    ],
    quantity: { type: Number, required: true },
    shipping: {
      type: Boolean,
    },
    sizes: [{ type: String }],
    colors: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
