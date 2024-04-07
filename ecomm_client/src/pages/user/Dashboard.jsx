import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import useAuthContext from "../../context/authContext";
import "./userDashboard.css";

const Dashboard = () => {
  const { auth } = useAuthContext();
  return (
    <Layout clName={"bg-success-subtle"} title={"Dashboard-Shopkaro"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="d-flex justify-content-center">
          <h2>User Dashboard</h2>
        </div>
        <div className="row p-3">
          <div className="col-md-4 mt-2">
            <UserMenu />
          </div>
          <div className="col-md-8 mt-2">
            <div className=" userCard p-2 text-start">
              <h3>
                User Name: <span> {auth?.user?.name}</span>
              </h3>
              <h3>
                User Email: <span>{auth?.user?.email}</span>
              </h3>
              <h3>
                User Address:<span> {auth?.user?.address} </span>
              </h3>
              <h3>
                User Phone No:<span> {auth?.user?.phone} </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
