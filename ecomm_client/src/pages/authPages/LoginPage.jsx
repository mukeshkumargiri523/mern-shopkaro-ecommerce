import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
//import { toast } from "react-toastify";

import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import useAuthContext from "../../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuthContext();
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate(location.state || "/");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Login - Shopkaro">
      <div className="register">
        <form onSubmit={handleLogin}>
          <h2 className="title">LOGIN FORM</h2>

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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div style={{ alignSelf: "flex-start" }}>
            <span>
              Not Registered{" "}
              <Link
                style={{
                  fontWeight: "500",
                  color: "darkblue",
                  whiteSpace: "nowrap",
                }}
                to={"/register"}
              >
                Go To SignUp
              </Link>
            </span>

            <Link
              style={{
                fontWeight: "500",
                color: "red",
                marginLeft: "3rem",
              }}
              to={"/forgot-password"}
            >
              Forgot password
            </Link>
            <Link
              style={{
                fontWeight: "500",
                color: "red",
                marginLeft: "3rem",
              }}
              to={"/reset-password-by-otp"}
            >
              Forgot password By Otp
            </Link>
          </div>

          <button type="submit" className="butn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
