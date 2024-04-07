import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//verify using token
export const signInAuthenticate = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "error in signinAuthentication middleware",
      err,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      req.userRole = 1;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "error in admin middleware",
    });
  }
};
