import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import useAuthContext from "../../context/authContext";
import "./adminDashboard.css";

function AdminDashboard() {
  const { auth } = useAuthContext();
  return (
    <Layout clName={"bg-info-subtle"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="d-flex justify-content-center">
          <h2>Admin Dashboard</h2>
        </div>
        <div
          className="row p-5 bg-warning-subtle"
          style={{ paddingRight: "-10px" }}
        >
          <div className="col-md-4  mt-2 ">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2">
            <div className="card p-2 text-start">
              <h3>
                Admin Name: <span> {auth?.user?.name}</span>
              </h3>
              <h3>
                Admin Email: <span>{auth?.user?.email}</span>
              </h3>
              <h3>
                Admin Contact:<span> {auth?.user?.phone} </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
