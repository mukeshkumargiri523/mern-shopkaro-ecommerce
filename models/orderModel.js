import mongoose from "mongoose";
// { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
const OrderSchema = new mongoose.Schema(
  {
    products: [],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
