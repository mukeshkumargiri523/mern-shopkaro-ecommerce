import mongoose from "mongoose";

const PdfFileSchema = new mongoose.Schema(
  {
    pdf: { type: String },
    pdfName: { type: String },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PdfFile", PdfFileSchema);
