import React from "react";
import Layout from "../components/layout/Layout";
import aboutuSlogo from "../images/about_us_img.jpg";

const AboutPage = () => {
  return (
    <Layout title={"About Us ShopKaro"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={aboutuSlogo} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h3 className=" text-bg-dark text-light px-4 ">About US</h3>
          <p className="text-justify p-3 mt-2 h5 text-info text-bg-secondary">
            An ecommerce business is a company that generates revenue from
            selling products or services online. For example, an ecommerce
            company might sell software, apparel, housewares, or web design
            services. You can run an ecommerce business from a single website or
            through multiple online channels like social media and email.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
