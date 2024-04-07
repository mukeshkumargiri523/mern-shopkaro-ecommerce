import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comment: [
      {
        type: String,
      },
    ],
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductReview", productReviewSchema);
