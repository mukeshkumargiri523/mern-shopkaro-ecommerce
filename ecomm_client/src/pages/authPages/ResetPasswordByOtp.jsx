import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import Layout from "../../components/layout/Layout";

const ResetPasswordByOtp = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toSendOtp, setToSendOtp] = useState(false);
  const [otpByUser, setOtpByUser] = useState("");
  const navigate = useNavigate();

  const sendingOtpToMail = async (e) => {
    e.preventDefault();
    try {
      setToSendOtp(true);
      const { data } = await axios.post(`/api/v1/auth/send-otp-to-user`, {
        email,
        toSendOtp,
      });
      if (data.success) {
        toast.success("Otp sent successfully");
      } else {
        toast.error("otp don't sent");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/auth/forgot-password-by-otp`, {
        email,
        newPassword,
        otpByUser,
      });
      if (data.success) {
        toast.success("Reset password successfully");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Forgot Password">
      <div className="register">
        <form onSubmit={resetPassword}>
          <h2 className="title">RESET PASSWORD BY OTP</h2>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <button onClick={sendingOtpToMail} className="btn btn-success">
            SEND OTP
          </button>
          <div className="form-group mb-3">
            <label htmlFor="otp">Enter Otp</label>
            <input
              type="number"
              className="form-control"
              id="otp"
              value={otpByUser}
              onChange={(e) => setOtpByUser(e.target.value)}
              placeholder="Enter Your Otp recieved"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <Link
            style={{
              fontWeight: "500",
              color: "darkblue",
              whiteSpace: "nowrap",
            }}
            to={"/login"}
          >
            Go To SignIn
          </Link>
          <button type="submit" className="butn">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasswordByOtp;
