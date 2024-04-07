import React from "react";
import Layout from "../components/layout/Layout";
import privacyImg from "../images/privacy_plicy_img.jpg";

function PolicyPage() {
  return (
    <Layout title={"Privacy ShopKaro"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={privacyImg} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4 p-3 bg-body-tertiary h5">
          <p>Privacy Agreement</p>
          <p>Privacy Notice</p>
          <p>Privacy Clause</p>
          <p>Privacy Pagey</p>
          <p>Privacy Policy Statement</p>
          <p>Privacy Agreement</p>
          <p>Privacy Notice</p>
          <p>Privacy Clause</p>
          <p>Privacy Pagey</p>
          <p>Privacy Policy Statement</p>
        </div>
      </div>
    </Layout>
  );
}

export default PolicyPage;
