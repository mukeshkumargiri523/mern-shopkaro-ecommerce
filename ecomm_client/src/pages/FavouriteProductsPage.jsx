import React, { useEffect, useState } from "react";
import SkeletonComp from "../components/SkeletonComp";
import useAuthContext from "../context/authContext";
import useCartContext from "../context/cartContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/layout/Layout";

function FavouriteProductsPage() {
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const { cart, setCart } = useCartContext();
  const [allFavProds, setAllFavProds] = useState([]);
  const navigate = useNavigate();

  //get all fav product
  async function getAllFavProd(user) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-all-favourite-products/${user}`
      );
      if (data?.success) {
        if (data?.allExistingProduct) {
          setAllFavProds(data.allExistingProduct.productsList);
          setLoading(false);
        } else {
          setAllFavProds([]);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    getAllFavProd(auth?.user._id);
  }, []);

  return (
    <Layout clName={"bg-warning-subtle"} title={"Yours Wishlist"}>
      <div className="row" style={{ margin: "20px 0 10px 10px" }}>
        <div className="col-md-12 ml-3 ">
          <div className="d-flex justify-content-center">
            <h2 className="text-center  mb-4">
              <span style={{ borderBottom: "2px solid green" }}>
                {" "}
                Your All Favourite Products
              </span>
            </h2>
          </div>
          {!loading ? (
            <div>
              {allFavProds.length < 1 ? (
                <h3>No Products Available</h3>
              ) : (
                <div className="homeProduct d-flex justify-content-center gap-2 flex-wrap mx-2">
                  {allFavProds?.map((prod) => (
                    <div
                      className="card"
                      key={prod._id}
                      style={{
                        width: "20rem",
                        margin: "0 10px 12px 10px",
                        height: "500px",
                      }}
                    >
                      <Link
                        to={`/product/${prod.slug}`}
                        style={{ textDecoration: "none" }}
                        className="product_link"
                      >
                        {prod && (
                          <img
                            src={`/api/v1/product/product-photo/${prod._id}`}
                            className="card-img-top"
                            style={{ height: "230px" }}
                            alt="product_image"
                          />
                        )}
                      </Link>
                      <div className="card-body bg-info-subtle">
                        <Link
                          key={prod._id}
                          to={`/product/${prod.slug}`}
                          style={{ textDecoration: "none", color: "black" }}
                          className="product_link"
                        >
                          <h5
                            className="card-title bg-danger-subtle p-1"
                            style={{ height: "50px", marginTop: "-10px" }}
                          >
                            {prod?.name.substring(0, 40)}...
                          </h5>
                          <h6 className="card-title" style={{ height: "25px" }}>
                            {prod.brand}
                          </h6>
                          <p
                            className="card-text"
                            style={{
                              overflow: "hidden",
                              height: "90px",
                              marginTop: "-10px",
                            }}
                          >
                            {prod?.description.substring(0, 100)}...
                          </p>
                        </Link>
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{
                            marginTop: "-22px",
                          }}
                        >
                          <p
                            className="card-text"
                            style={{
                              marginTop: "16px",
                              fontWeight: "500",
                              fontSize: "20px",
                            }}
                          >
                            $ {prod?.price}
                          </p>
                        </div>

                        <div
                          className="d-flex gap-1"
                          style={{ marginTop: "12px" }}
                        >
                          <button
                            className="btn ms-2 cartBtn"
                            style={{ background: "blue", color: "white" }}
                            onClick={() => navigate(`/product/${prod.slug}`)}
                          >
                            More Detail
                          </button>
                          {auth.user ? (
                            <button
                              className="btn ms-2 cartBtn"
                              style={{
                                background: "orangered",
                                color: "white",
                              }}
                              onClick={() => {
                                if (
                                  cart.findIndex(
                                    (item) => item._id === prod._id
                                  ) < 0
                                ) {
                                  setCart([
                                    ...cart,
                                    { ...prod, userId: auth?.user.email },
                                  ]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([
                                      ...cart,
                                      { ...prod, userId: auth?.user.email },
                                    ])
                                  );
                                  toast.success("Items added to cart");
                                } else {
                                  toast.error("Item Already Added");
                                }
                              }}
                            >
                              {cart.find((item) => item._id === prod._id)
                                ? "Go To Cart"
                                : "Add To Cart"}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="d-flex justify-content-center ">
              <SkeletonComp cards={10} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FavouriteProductsPage;
