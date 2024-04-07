import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader";
import axios from "axios";
import deliveredLogo from "../../images/deliveryIcon/door-delivery.png";
import processingLogo from "../../images/deliveryIcon/briefcase.png";
import notProcessLogo from "../../images/deliveryIcon/preorder.png";
import cancelLogo from "../../images/deliveryIcon/cancel.png";
import shippedLogo from "../../images/deliveryIcon/delivery-truck.png";
import ViewPdf from "../../components/ViewPdf";
import toast from "react-hot-toast";

function SingleOrder() {
  const { oid } = useParams();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [statusColor, setStatusColor] = useState();
  const [orderStatus, setOrderStatus] = useState("");
  const [order, setOrder] = useState();

  const [orderId, setOrderId] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [pdfData, setPdfData] = useState("");

  function showPdf(pdf) {
    if (pdf) {
      setPdfFile(`http://localhost:8080/files/${pdf}`);
    }
  }

  const getPdf = async () => {
    try {
      const oid = orderId;
      if (oid) {
        const { data } = await axios.get(`/get-pdf-file/${oid}`);
        if (data.success) {
          setPdfData(data?.pdfData);
        } else {
          setPdfData("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPdf();
  }, [orderId]);

  const navigate = useNavigate();
  async function getSingleOrder() {
    try {
      setLoading(true);
      if (oid) {
        const { data } = await axios.get(`/api/v1/auth/order/${oid}`);
        setOrder(data.order);
        setOrderId(data.order._id);
        setOrderStatus(data.orderStatus);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  useEffect(() => {
    getSingleOrder();
  }, []);

  useEffect(() => {
    if (order) {
      const cartTotalAmount = order.products.reduce(
        (amount, item) => item.price * item.cartQuantity + amount,
        0
      );
      setTotalAmount(cartTotalAmount);
    }
    if (orderStatus) {
      if (orderStatus === "Not Process") {
        setStatusColor("text-warning");
      } else if (orderStatus === "Processing") {
        setStatusColor("text-info");
      }
      if (orderStatus === "Shipped") {
        setStatusColor("text-primary");
      }
      if (orderStatus === "Delivered") {
        setStatusColor("text-success");
      }
      if (orderStatus === "Cancel") {
        setStatusColor("text-danger");
      }
    }
  }, [order, orderStatus]);

  return (
    <Layout clName={"bg-info-subtle"} title={"Your order"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ml-4 mr-4 p-3">
            {loading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <>
                {order && (
                  <>
                    <div className="d-flex justify-content-center">
                      <h2>Your Order</h2>
                    </div>
                    <div
                      style={{ borderRadius: "10px" }}
                      className="bg-danger-subtle order-user-detail p-3 mt-3 mb-3"
                    >
                      <h4>
                        Order Id:{" "}
                        <span className="text-info">{order?._id}</span>
                      </h4>
                      <h4>
                        Name:{" "}
                        <span className="text-primary">
                          {order?.buyer.name}
                        </span>
                      </h4>
                      <h4>
                        Address:{" "}
                        <span className="text-primary">
                          {order?.buyer.address}
                        </span>
                      </h4>
                      <h4>
                        Phone No:{" "}
                        <span className="text-danger">
                          +91 {order?.buyer.phone}
                        </span>
                      </h4>
                      <h4>
                        Total Price:{" "}
                        <span className="text-success">$ {totalAmount}</span>
                      </h4>
                      <h4>
                        Order Status:{" "}
                        <span className={statusColor}>{orderStatus}</span>
                      </h4>
                      <div className="d-flex flex-row align-items-center">
                        <h4> Delivery Path:</h4>{" "}
                        {orderStatus === "Not Process" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="fw-3 fs-1 mb-2 text-warning">
                              ------
                            </span>
                            <img
                              className="deliveryIcon"
                              src={notProcessLogo}
                              alt="devicon"
                            />
                          </div>
                        ) : orderStatus === "Processing" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="fw-3 fs-1 mb-2 text-info">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-info">
                              ------
                            </span>
                            <img
                              className="deliveryIcon"
                              src={processingLogo}
                              alt="devicon"
                            />
                          </div>
                        ) : orderStatus === "Shipped" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="fw-3 fs-1 mb-2 text-primary">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-primary">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-primary">
                              ------
                            </span>
                            <img
                              className="deliveryIcon"
                              src={shippedLogo}
                              alt="devicon"
                            />
                          </div>
                        ) : orderStatus === "Delivered" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="fw-3 fs-1 mb-2 text-success">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-success">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-success">
                              ------
                            </span>
                            <span className="fw-3 fs-1 mb-2 text-success">
                              ------
                            </span>
                            <img
                              className="deliveryIcon"
                              src={deliveredLogo}
                              alt="devicon"
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="fw-3 fs-1 mb-2 text-danger">
                              --
                            </span>
                            <img
                              className="deliveryIcon"
                              src={cancelLogo}
                              alt="devicon"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {order.products?.map((prod) => (
                      <div
                        onClick={() => navigate(`/product/${prod.slug}`)}
                        key={prod._id}
                        className="row mb-2 flex-row p-2"
                        style={{
                          border: "2px solid skyblue",
                          borderRadius: "15px",
                          background: "#fffaf2",
                        }}
                      >
                        <div className="col-md-6 d-flex align-items-center">
                          {prod && (
                            <img
                              src={`/api/v1/product/product-photo/${prod._id}`}
                              style={{
                                height: "190px",
                                width: "230px",
                                border: "2px solid red",
                                borderRadius: "8px",
                              }}
                              alt="product_image"
                            />
                          )}
                        </div>
                        <div className="col-md-6 px-5">
                          <h6>{prod?.name}</h6>
                          <p>{prod?.description.substring(0, 50)}...</p>
                          <h6>Price :$ {prod?.price}</h6>
                          <h6>Quantity : {prod?.cartQuantity}</h6>
                          {prod?.category?._id === "660c3a703b009992de3e49a4" ||
                          prod?.category?._id === "660c3a813b009992de3e49a9" ? (
                            <>
                              <h6>Color: {prod.color}</h6>
                              <h6>Size: {prod.size}</h6>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}

                    <div
                      style={{ borderRadius: "10px" }}
                      className="bg-danger-subtle order-user-detail p-3 mt-3 mb-3"
                    >
                      <div className="d-flex justify-content-center">
                        <h2>Invoice Pdf Of Order</h2>
                      </div>
                      <div className="bg-success-subtle">
                        {pdfData ? (
                          <div className="d-flex p-2 flex-column justify-content-center">
                            <h3 className="text-center">
                              Invoice Name:{" "}
                              <span className="text-danger">
                                {" "}
                                {pdfData.pdfName}
                              </span>
                            </h3>
                            <br />
                            <button
                              onClick={() => showPdf(pdfData.pdf)}
                              className="btn btn-info"
                            >
                              Show Pdf
                            </button>
                            <ViewPdf pdfFile={pdfFile} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleOrder;
