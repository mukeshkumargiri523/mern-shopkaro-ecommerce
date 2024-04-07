import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"404 PAGE ShopKaro"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <div className="d-flex justify-content-center">
          <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        </div>
        <Link to="/" className="pnf-btn">
          Go Back To Home
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
