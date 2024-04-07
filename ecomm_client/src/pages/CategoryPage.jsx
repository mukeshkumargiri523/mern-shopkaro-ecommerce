import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";
import useCartContext from "../context/cartContext";
import toast from "react-hot-toast";
import useAuthContext from "../context/authContext";

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const { cart, setCart } = useCartContext();
  const { auth, setAuth } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getProductByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-by-category/${params.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params]);

  return (
    <Layout clName={"bg-danger-subtle"} title={"Categories"}>
      <div className="container mb-3 mt-4">
        <h3
          className="text-center"
          style={{ textTransform: "capitalize", textDecoration: "underline" }}
        >
          Category - {category?.name}
        </h3>
        <h4 className="text-center">
          Product {products?.length} results found
        </h4>
        <div className="row">
          {!loading ? (
            <div className="categoryProduct d-flex gap-2 justify-content-center flex-wrap">
              {products.length < 1 ? (
                <h3>No Products Available</h3>
              ) : (
                <>
                  {products?.map((prod) => (
                    <div
                      className="card"
                      key={prod._id}
                      style={{
                        width: "19rem",
                        margin: "12px 16px",
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
                      <div className="card-body bg-warning-subtle">
                        <Link
                          key={prod._id}
                          to={`/product/${prod.slug}`}
                          style={{ textDecoration: "none", color: "black" }}
                          className="product_link"
                        >
                          <h5
                            className="card-title"
                            style={{ height: "70px", marginTop: "-10px" }}
                          >
                            {prod.name}
                          </h5>
                          <p
                            className="card-text"
                            style={{
                              overflow: "hidden",
                              height: "100px",
                              marginTop: "-10px",
                            }}
                          >
                            {prod?.description.substring(0, 120)}...
                          </p>
                          <div className="d-flex justify-content-between">
                            <p
                              className="card-text fs-5"
                              style={{ fontWeight: "500", marginTop: "-10px" }}
                            >
                              $ {prod?.price}
                            </p>
                            {(prod.category.name === "air conditioner" ||
                              prod.category.name === "tshirt" ||
                              prod.category.name === "home decoration") && (
                              <div
                                style={{
                                  color: "white",
                                  padding: "0 10px 0 10px",
                                  margin: "-20px 0 10px 0",
                                  background:
                                    "linear-gradient(to right, #c21500, #ffc500)",
                                }}
                              >
                                SALE IS LIVE
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="d-flex" style={{ marginTop: "-5px" }}>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => navigate(`/product/${prod.slug}`)}
                          >
                            More Detail
                          </button>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <>
              <CardSkeleton cards={8} />
              {/* <Loader /> */}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryPage;
