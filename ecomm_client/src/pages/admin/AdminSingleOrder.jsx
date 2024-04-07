import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import deliveredLogo from "../../images/deliveryIcon/door-delivery.png";
import processingLogo from "../../images/deliveryIcon/briefcase.png";
import notProcessLogo from "../../images/deliveryIcon/preorder.png";
import cancelLogo from "../../images/deliveryIcon/cancel.png";
import shippedLogo from "../../images/deliveryIcon/delivery-truck.png";
import { pdfjs } from "react-pdf";
import ViewPdf from "../../components/ViewPdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const { Option } = Select;

function AdminSingleOrder() {
  const { oid } = useParams();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState("");
  const [file, setFile] = useState();
  const [pdfFile, setPdfFile] = useState("");
  const [pdfName, setPdfName] = useState();
  const [pdfData, setPdfData] = useState("");
  const [statusColor, setStatusColor] = useState();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  async function getSingleOrder() {
    try {
      setLoading(true);
      if (oid) {
        const { data } = await axios.get(`/api/v1/auth/admin-order/${oid}`);
        setOrder(data.order);
        setOrderId(data.order._id);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function handleChangeStatus(oid, statusValue) {
    try {
      setLoading(true);
      if (oid && statusValue) {
        const { data } = await axios.put(
          `/api/v1/auth/order-status-update/${oid}`,
          {
            status: statusValue,
          }
        );
        if (data.success) {
          toast.success(data.message);
          getSingleOrder();
        }
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

  function showPdf(pdf) {
    if (pdf) {
      // window.open(`http://localhost:8080/files/${pdf}`, "_blank", "noreferror");
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
      toast.error("No invoice found please upload");
    }
  };
  useEffect(() => {
    getPdf();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const cartTotalAmount = order.products.reduce(
        (amount, item) => item.price * item.cartQuantity + amount,
        0
      );
      setTotalAmount(cartTotalAmount);
      if (order.status === "Not Process") {
        setStatusColor("text-warning");
      } else if (order.status === "Processing") {
        setStatusColor("text-info");
      }
      if (order.status === "Shipped") {
        setStatusColor("text-primary");
      }
      if (order.status === "Delivered") {
        setStatusColor("text-success");
      }
      if (order.status === "Cancel") {
        setStatusColor("text-danger");
      }
    }
  }, [order]);

  async function handleUpload() {
    try {
      setLoading(true);
      if (orderId && file && pdfName) {
        const formData = new FormData();
        formData.append("pdfName", pdfName);
        formData.append("file", file);
        formData.append("orderId", orderId);
        const res = await axios.post("/upload-pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          toast.success("pdf uploaded successfully");
        } else {
          toast.err(res.message);
        }
      } else {
        toast.error("All fields are required to upload");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
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
                      <div>
                        <h4>
                          Order Status:{" "}
                          <span className={statusColor}>{order?.status}</span>
                        </h4>
                        <Select
                          onChange={(value) =>
                            handleChangeStatus(order._id, value)
                          }
                          defaultValue={order?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <h4> Delivery Path:</h4>{" "}
                        {order.status === "Not Process" ? (
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
                        ) : order.status === "Processing" ? (
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
                        ) : order.status === "Shipped" ? (
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
                        ) : order.status === "Delivered" ? (
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
                        <h2>Invoice File Upload</h2>
                      </div>
                      <form onSubmit={handleUpload}>
                        <input
                          type="text"
                          name="pdfName"
                          placeholder="invoice pdf name"
                          className="form-control"
                          required
                          onChange={(e) => setPdfName(e.target.value)}
                        />
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          accept="application/pdf"
                          name="file"
                          required
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <br />
                        <button className="btn btn-primary" type="submit">
                          Upload Pdf
                        </button>
                      </form>
                      <br />
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

export default AdminSingleOrder;
