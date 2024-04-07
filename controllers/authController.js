import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import orderModel from "../models/orderModel.js";
import { sendOtpMail, sendQueryMail } from "../Services/common.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, question, phone, address, answer } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if (!question) {
      return res.send({ message: "Question is Required" });
    }
    if (!phone || phone.length > 10) {
      return res.send({ message: "Phone no is Required or Invalid" });
    }
    if (!photo || photo.size > 1000000) {
      return res.send({
        message: "Photo is Required and should be less than 400kb",
      });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }
    //register user
    const hashedPass = await hashPassword(password);
    //save
    // const user = await new userModel({
    //   name,
    //   email,
    //   phone,
    //   address,
    //   password: hashedPass,
    //   question,
    //   answer,
    // }).save();

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPass,
      question,
      answer,
    });
    if (photo) {
      user.photo.data = fs.readFileSync(photo.path);
      user.photo.contentType = photo.type;
    }
    const newUser = await user.save();
    res
      .status(201)
      .send({ success: true, message: "User Register Success", newUser });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

//Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Enter email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Login Success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    });
  }
};

//test User

export const testUser = (req, res) => {
  res.send({ message: "test complete" });
};

//get All user
export const getAllUsers = async (req, res) => {
  try {
    //validation
    const users = await userModel.find({}).select("-photo").select("-password");
    if (!users) {
      return res.status(400).send({
        success: false,
        message: "NO Users registered",
      });
    }

    res.status(200).send({
      success: true,
      message: "Found all Users",
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in finding users",
      err,
    });
  }
};

//getting photo of user
export const getUserPhoto = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ email }).select("photo");

    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
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

//forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword, question } = req.body;

    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if (!newPassword) {
      return res.send({ message: "New Password is Required" });
    }
    if (!question) {
      return res.send({ message: "Question is Required" });
    }

    //check
    const user = await userModel.findOne({ email, answer, question });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashedPass = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPass });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      err,
    });
  }
};

//sendOtp
let otpSentToUser = undefined;
function generateOtp() {
  const randomNum = Math.random() * 9000;
  otpSentToUser = Math.floor(1000 + randomNum);
  return otpSentToUser;
}

export const sendOtp = async (req, res) => {
  try {
    const { email, toSendOtp } = req.body;

    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!toSendOtp) {
      return res.send({ message: "otp to send is Required" });
    }

    //check
    const user = await userModel.findOne({ email });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email",
      });
    }
    if (toSendOtp) {
      let otp = generateOtp();
      otp = otp.toString();
      sendOtpMail({
        to: email,
        subject: "sent otp to reset password",
        text: otp,
      });

      return res.status(200).send({
        success: true,
        message: "Otp sent successfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Otp sent failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in sending otp",
      err,
    });
  }
};

//forgot passowrd by otp
export const forgotPasswordByOtp = async (req, res) => {
  try {
    const { email, newPassword, otpByUser } = req.body;
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!otpByUser) {
      return res.send({ message: "Otp by user is Required" });
    }
    if (!newPassword) {
      return res.send({ message: "New Password is Required" });
    }

    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email",
      });
    }

    if (otpSentToUser == otpByUser) {
      const hashedPass = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashedPass });
      res.status(200).send({
        success: true,
        message: "Password reset successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Password reset unsuccessfull due to wrong otp",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      err,
    });
  }
};

export const sendQueryOrFeedback = async (req, res) => {
  try {
    const { email, query } = req.body;
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!query) {
      return res.send({ message: "Query is Required" });
    }

    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or email not registered",
      });
    }

    sendQueryMail({
      from: email,
      to: "mukeshkumargiri524@gmail.com",
      subject: `sent Query by ${email}`,
      text: query,
    });

    return res.status(200).send({
      success: true,
      message: "Query Sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in sending password",
      err,
    });
  }
};

//update profile

export const profileUpdate = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required with min 6 character long",
      });
    }

    const hashedPass = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPass || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in update profile",
      err,
    });
  }
};

//get all orders of own
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json({ orders });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting your orders",
      err,
    });
  }
};

// get own single order
export const getSingleOrder = async (req, res) => {
  try {
    const oid = req.params.oid;
    if (oid && req.user) {
      const order = await orderModel
        .findOne({ _id: oid }, { buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "-photo");
      const orderAgain = await orderModel
        .findOne({ _id: oid })
        .populate("products", "name")
        .populate("buyer", "name");
      res.json({ order: order, orderStatus: orderAgain.status });
    } else {
      res.status(400).send({
        success: false,
        message: "User order id is required and user id",
        err,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting your single order",
      err,
    });
  }
};

// get all orders of users by admin
export const getAllOrdersOfUserByAdmin = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders by admin",
      err,
    });
  }
};

//get single order of user by admin
export const getSingleOrdersOfUserByAdmin = async (req, res) => {
  try {
    const oid = req.params.oid;
    if (oid && req.userRole) {
      const order = await orderModel
        .findOne({ _id: oid })
        .populate("products", "-photo")
        .populate("buyer", "-photo");
      res.json({ order });
    } else {
      res.status(400).send({
        success: false,
        message: "user order id is required and admin also",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting your single order",
      err,
    });
  }
};

//get single order of user by admin
export const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const oid = req.params.oid;
    const { status } = req.body;
    if (oid && req.userRole) {
      const order = await orderModel
        .findByIdAndUpdate({ _id: oid }, { status }, { new: true })
        .populate("products", "-photo")
        .populate("buyer", "-photo");

      res.status(200).send({
        success: true,
        message: "Order Status Updated Success",
        order,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "user order id is required and admin also",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      err,
    });
  }
};
