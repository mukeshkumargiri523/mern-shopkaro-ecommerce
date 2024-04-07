import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthContext from "../../context/authContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, []);

  return (
    <Layout clName={"bg-info-subtle"} title={"User orders"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="d-flex justify-content-center">
          <h2>Orders</h2>
        </div>
        <div className="row p-3">
          <div className="col-md-4 mt-2">
            <UserMenu />
          </div>

          <div className="col-md-8 mt-2">
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
                              navigate(`/dashboard/user/order/${ord._id}`)
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
      </div>
    </Layout>
  );
}

export default Orders;
