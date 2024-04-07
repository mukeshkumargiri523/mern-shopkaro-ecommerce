import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import contactISlogo from "../images/contact_us_img.jpg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import useAuthContext from "../context/authContext";
import "../styles/AuthStyle.css";
import axios from "axios";
import toast from "react-hot-toast";
const ContactPage = () => {
  const { auth } = useAuthContext();
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  async function handleEmail(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/auth/send-query`, {
        email,
        query,
      });
      if (data.success) {
        toast.success("Query sent successfully");
        setQuery("");
      } else {
        toast.error("Query didn't sent");
        setQuery("");
      }
    } catch (err) {
      setQuery("");

      console.log(err);
      toast.error("Something Went Wrong");
    }
  }
  return (
    <Layout title={"Contact Us ShopKaro"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={contactISlogo} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any query and info about product feel free to call anytime we
            24X7 vaialible
          </p>
          <p className="mt-3 text-bg-info h4">
            <BiMailSend /> : www.help@shopkaro.com
          </p>
          <p className="mt-3 text-bg-primary h4">
            <BiPhoneCall /> : 019-2524-260-290
          </p>
          <p className="mt-3 text-bg-primary h4">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
        {auth.user ? (
          <div className="register col-md-11">
            <form onSubmit={handleEmail}>
              <div className="d-flex justify-content-center">
                <h2 className="title">Send Your Query And Feedback</h2>
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
                <label htmlFor="query">Your Query</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Your Query Or Feedback"
                  required
                />
              </div>

              <button type="submit" className="butn">
                Send Query
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default ContactPage;
