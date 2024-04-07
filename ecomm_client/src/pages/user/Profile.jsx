import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import useAuthContext from "../../context/authContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./userProfile.css";

function Profile() {
  const { auth, setAuth } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        address,
        phone,
      });
      if (data.success) {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);

  return (
    <Layout clName={"bg-info-subtle"} title={"User Profile"}>
      <div className=" container-fluid my-2 py-2 text-center">
        <div className="row p-3">
          <div className="col-md-4 mt-2">
            <UserMenu />
          </div>
          <div className="col-md-8 mt-2">
            <div className="user-profile-form">
              <form className=" bg-opacity-25" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <h2>YOUR PROFILE</h2>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
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
                  />
                </div>

                <button type="submit" className="btn">
                  UPDATE PROFILE
                </button>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
