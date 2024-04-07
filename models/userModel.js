import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },
    question: {
      type: String,
      enum: [
        "Enter your favourite sports",
        "Enter your favourite dish",
        "Enter your favourite actor",
      ],
      default: "Enter your favourite sports",
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    answer: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
