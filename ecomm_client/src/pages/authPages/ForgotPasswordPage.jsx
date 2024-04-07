import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import Layout from "../../components/layout/Layout";
const options = [
  "Enter your favourite sports",
  "Enter your favourite dish",
  "Enter your favourite actor",
];
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
        question,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Forgot Password">
      <div className="register">
        <form onSubmit={handleForgot}>
          <h2 className="title">RESET PASSWORD</h2>

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
          <div className="form-group mb-3">
            <label>Question</label>
            <select
              className="form-select"
              onChange={(e) => setQuestion(e.target.value)}
            >
              <option>Please choose one Question</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              className="form-control"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Your Answer"
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

export default ForgotPasswordPage;
