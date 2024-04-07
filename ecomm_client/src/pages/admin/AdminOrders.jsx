import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import useAuthContext from "../../context/authContext";
import Loader from "../../components/Loader";

function AdminOrders() {
  const { auth } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/get-all-orders");
      setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user.role && auth?.token) {
      getOrders();
    }
  }, []);
  return (
    <Layout clName={"bg-info-subtle"} title={"Admin Orders list"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="d-flex justify-content-center">
          <h2>Admin Dashboard</h2>
        </div>
        <div
          className="row p-2 bg-warning-subtle"
          style={{ paddingRight: "-10px" }}
        >
          <div className="col-md-3  mt-2 ">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-2">
            <div className="d-flex justify-content-center">
              <h2 className="text-center">All Orders</h2>
            </div>
            <h3>List of All Orders</h3>

            {!loading ? (
              <>
                {orders.length !== 0 ? (
                  orders?.map((ord, i) => (
                    <div key={i} className="border shadow">
                      <table className="table">
                        <thead>
                          <tr>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              #
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Status
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Buyer
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Order Name
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Cart Amount
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Orders
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Payment
                            </th>
                            <th
                              style={{
                                borderLeft: "1px solid green",
                                borderBottom: "1px solid red",
                              }}
                            >
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            onClick={() =>
                              navigate(`/dashboard/admin/order/${ord._id}`)
                            }
                            style={{
                              backgroundColor: "#ffc5cd",
                            }}
                          >
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.status}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.buyer?.name}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.products[0]?.brand}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.payment.transaction.amount}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {moment(ord?.createdAt).fromNow()}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.payment.success ? "Success" : "Failed"}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {ord?.products?.length}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <h3>No Orders placed yet</h3>
                )}
              </>
            ) : (
              <div className="d-flex justify-content-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
}

export default AdminOrders;
