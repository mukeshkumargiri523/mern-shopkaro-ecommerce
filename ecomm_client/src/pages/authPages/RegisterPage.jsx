import React, { useState } from "react";
import { toast } from "react-hot-toast";
// import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import Layout from "../../components/layout/Layout";
const options = [
  "Enter your favourite sports",
  "Enter your favourite dish",
  "Enter your favourite actor",
];

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");
  const [question, setQuestion] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        // const res = await axios.post(`/api/v1/auth/register`, {
        //   name,
        //   email,
        //   password,
        //   address,
        //   phone,
        //   answer,
        //   question,
        // });
        // if (res && res.data.success) {
        //   toast.success(res.data.message);
        //   //  alert("register successfully");
        //   navigate("/login");
        // } else {
        //   toast.error(res.data.message);
        // }

        const userData = new FormData();
        userData.append("name", name);
        userData.append("email", email);
        userData.append("password", password);
        userData.append("photo", photo);
        userData.append("address", address);
        userData.append("phone", phone);
        userData.append("answer", answer);
        userData.append("question", question);
        const res = await axios.post(`/api/v1/auth/register`, userData);
        if (res && res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error("Password doesn't match");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Register Now"}>
      <div className="register">
        <form className=" bg-opacity-25" onSubmit={handleRegister}>
          <h2>REGISTRATION FORM</h2>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
          </div>
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
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone no"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
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
          <div className="form-group mb-3">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
              placeholder="Enter Answer"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="uploadImg" className="admBtn">
              {photo ? `Upload ${photo.name}` : "Upload Profile Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                id="uploadImg"
                hidden
              />
            </label>
          </div>
          <div className="mb-2">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-resposive"
                />
              </div>
            )}
          </div>

          <div style={{ alignSelf: "flex-start" }}>
            <span>
              Already Registered{" "}
              <Link
                style={{
                  fontWeight: "500",
                  color: "darkblue",
                  whiteSpace: "nowrap",
                }}
                to={"/login"}
              >
                Go To Login
              </Link>
            </span>

            <Link
              style={{
                fontWeight: "500",
                color: "red",
                marginLeft: "1rem",
              }}
              to={"/forgot-password"}
            >
              Forgot password
            </Link>
          </div>
          <button type="submit" className="butn">
            REGISTER
          </button>
          <div></div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
