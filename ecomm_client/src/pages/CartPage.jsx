import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useAuthContext from "../context/authContext";
import useCartContext from "../context/cartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function CartPage() {
  const { auth, setAuth } = useAuthContext();
  const { cart, setCart } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [loadEffect, setLoadEffect] = useState(true);
  const [instance, setInstance] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      let parsedItem = JSON.parse(existingCartItem);
      let newCart = parsedItem.map((singItm) => {
        if (auth?.user?.email === singItm?.userId) {
          return singItm;
        }
      });

      for (let i = 0; i < newCart.length; i++) {
        if (newCart.includes(undefined)) {
          let x = newCart.indexOf(undefined);
          newCart.splice(x, 1);
        } else {
          break;
        }
      }

      // let veryNewCart = newCart.map((item) => {
      //   console.log(item);
      //   if (item !== undefined) {
      //     return item;
      //   } else {
      //     return null;
      //   }
      // });
      if (newCart[0] === undefined) {
        setCart([]);
      } else {
        setCart(newCart);
      }
      setLoadEffect(false);
    }
    setLoading(false);
  }, []);

  function handleCartQuantity() {
    if (cart) {
      let veryNewCart = cart.map((item) => {
        if (!item.hasOwnProperty("cartQuantity")) {
          item.cartQuantity = 1;
          return item;
        } else {
          return item;
        }
      });
      setCart(veryNewCart);
    }
  }

  useEffect(() => {
    if (loadEffect === false) {
      handleCartQuantity();
    }
  }, [loadEffect]);

  //remove Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      const totalAmount = cart.reduce(
        (amount, item) => item.price * item.cartQuantity + amount,
        0
      );

      // let total = 0;
      // cart?.map((item) => {
      //   total = total + item.price;
      // });
      return totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handleQuantityAndPrice(e, prod) {
    let newValueCart = cart.map((item) => {
      if (item._id === prod._id) {
        item.cartQuantity = +e.target.value;
        return item;
      } else {
        return item;
      }
    });
    setCart(newValueCart);
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const totalAmount = cart.reduce(
        (amount, item) => item.price * item.cartQuantity + amount,
        0
      );
      let totalCartPrice = totalAmount;
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        totalCartPrice,
      });
      setPaymentLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout clName={"bg-primary-subtle"} title={"CART Page"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-center">
              {" "}
              <h2 className="text-center mt-1 bg-light p-2">{`Hello ${auth?.token &&
                auth?.user?.name}`}</h2>
            </div>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : "Your Cart is Empty"}{" "}
              {<FaShoppingCart style={{ color: "orange" }} />}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-6">
              {loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <>
                  {cart &&
                    cart?.map((prod) => (
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
                              style={{ height: "190px", width: "230px" }}
                              alt="product_image"
                            />
                          )}
                        </div>

                        <div className="col-md-6 px-5">
                          <h6>{prod.name}</h6>
                          <p>{prod.description.substring(0, 20)}...</p>
                          <h6>Price :$ {prod.price}</h6>
                          {prod?.category?._id === "660c3a703b009992de3e49a4" ||
                          prod?.category?._id === "660c3a813b009992de3e49a9" ? (
                            <>
                              <h6>Color: {prod.color}</h6>
                              <h6>Size: {prod.size}</h6>
                            </>
                          ) : (
                            <></>
                          )}
                          <div>
                            <select
                              className="form-select mt-1 mb-1 w-50"
                              onChange={(e) => handleQuantityAndPrice(e, prod)}
                              value={prod.cartQuantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                          <button
                            className="btn btn-danger cartBtn mt-1"
                            onClick={() => removeCartItem(prod._id)}
                          >
                            Remove Product{" "}
                            <FaShoppingCart style={{ color: "#0ffff8" }} />
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
            <div
              style={{
                margin: "0 1rem 1rem 0",
                marginLeft: "1rem",
                borderRadius: "1rem",
                padding: "0",
                overflow: "hidden",
                // maxHeight: "35rem",
              }}
              className="col-md-5  text-center bg-danger-subtle"
            >
              <div
                style={{
                  background: "linear-gradient(to right, #add100, #7b920a)",
                  padding: "3px 10px",
                  color: "white",
                }}
              >
                <h4>Cart Summary</h4>
                <p>Total | Checkout | Payment</p>
                <hr />
              </div>
              <div
                style={{
                  background: "linear-gradient(to right, #ff4e50, #f9d423)",
                  color: "#E0FFFF",
                  height: "100%",
                }}
                className="p-3"
              >
                <h5>Total: {totalPrice()}</h5>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-info text-secondary"
                        onClick={() => navigate(`/dashboard/user/profile`)}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn-outline-info"
                        onClick={() => navigate(`/dashboard/user/profile`)}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate(`/login`, {
                            state: "/cart",
                          })
                        }
                      >
                        PLease Login to Checkout
                      </button>
                    )}
                  </div>
                )}
                {clientToken && cart?.length ? (
                  <div className="mt-2 p-2">
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => {
                        setInstance(instance);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={
                        paymentLoading || !instance || !auth?.user?.address
                      }
                    >
                      {paymentLoading ? "Processing.." : "Make Payment"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
