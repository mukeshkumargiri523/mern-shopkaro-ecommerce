import { Router } from "express";
import {
  loginUser,
  registerUser,
  testUser,
  forgotPassword,
  profileUpdate,
  getUserPhoto,
  getAllOrders,
  getSingleOrder,
  getAllOrdersOfUserByAdmin,
  getSingleOrdersOfUserByAdmin,
  updateOrderStatusByAdmin,
  forgotPasswordByOtp,
  sendOtp,
  sendQueryOrFeedback,
  getAllUsers,
} from "../controllers/authController.js";
import { isAdmin, signInAuthenticate } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";

const router = Router();

//routing
router.post("/register", ExpressFormidable(), registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/send-otp-to-user", sendOtp);
router.post("/forgot-password-by-otp", forgotPasswordByOtp);
router.post("/send-query", signInAuthenticate, sendQueryOrFeedback);
router.get("/user-photo/:email", getUserPhoto);
router.get("/test", signInAuthenticate, isAdmin, testUser);
router.get("/user-auth", signInAuthenticate, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/get-all-users", signInAuthenticate, isAdmin, getAllUsers);
router.get("/orders", signInAuthenticate, getAllOrders);
router.get("/order/:oid", signInAuthenticate, getSingleOrder);

router.get("/admin-auth", signInAuthenticate, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get(
  "/get-all-orders",
  signInAuthenticate,
  isAdmin,
  getAllOrdersOfUserByAdmin
);
router.put(
  "/order-status-update/:oid",
  signInAuthenticate,
  isAdmin,
  updateOrderStatusByAdmin
);
router.get(
  "/admin-order/:oid",
  signInAuthenticate,
  isAdmin,
  getSingleOrdersOfUserByAdmin
);
router.put("/profile", signInAuthenticate, profileUpdate);

export default router;
