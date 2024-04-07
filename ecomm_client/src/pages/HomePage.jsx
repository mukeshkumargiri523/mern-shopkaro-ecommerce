import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Modal, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Brands } from "../components/Brands";
import useCartContext from "../context/cartContext";
import useAuthContext from "../context/authContext";
import SkeletonComp from "../components/SkeletonComp";
import CarouselComp from "../components/Carousel";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import VisitedProducts from "../components/VisitedProducts";
import LogoSlider from "../components/LogoSlider";
import Chatbot from "../components/ChatBot";
import chatbotImg from "../images/chatbot1image.png";
import { motion, useScroll } from "framer-motion";

const HomePage = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandsRadio, setBrandRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allFavProds, setAllFavProds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const { cart, setCart } = useCartContext();

  const { scrollYProgress } = useScroll();

  //get Total Count of produt
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalCount();
  }, []);

  async function favProductAddOrRemove(user, product) {
    try {
      const { data } = await axios.post(
        `/api/v1/product/create-favourite-product`,
        {
          user,
          product,
        }
      );
      if (data?.success) {
        toast.success(data.message);

        // getSingleFavProd(user, product);
        getAllFavProd(user);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong 1");
    }
  }

  //get single fav product
  // async function getSingleFavProd(user, product) {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/product/get-favourite-product/${user}/${product}`
  //     );
  //     if (data?.success) {
  //       if (data.existingProduct) {
  //         setFavColor(true);
  //       } else {
  //         setFavColor(false);
  //       }
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //     toast.error("Something went wrong");
  //   }
  // }

  //get all fav product
  async function getAllFavProd(user) {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-all-favourite-products/${user}`
      );
      if (data?.success) {
        if (data.allExistingProduct) {
          setAllFavProds(data.allExistingProduct.productsList);
        } else {
          setAllFavProds([]);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong 4");
    }
  }

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-by-page/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
        if (auth.user) {
          getAllFavProd(auth?.user._id);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("something went wrong");
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-by-page/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts([...products, ...data?.products]);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong 2");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //fiter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!auth.user) {
      toast.success("Login To add Products To Cart");
    }
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length || !brandsRadio.length) {
      getAllProducts();
    }
  }, [checked.length]);

  useEffect(() => {
    if (checked.length || radio.length || brandsRadio.length) filterProduct();
  }, [checked, radio, brandsRadio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      setLoading(true);
      if (brandsRadio === "All" && radio[0] === 0 && radio[1] === 2000) {
        const { data } = await axios.post(`/api/v1/product/product-filter`, {
          checked,
        });
        setLoading(false);
        return setProducts(data?.products);
      }

      if (brandsRadio === "All") {
        const { data } = await axios.post(`/api/v1/product/product-filter`, {
          checked,
          radio,
        });
        setLoading(false);
        return setProducts(data?.products);
      }
      if (radio[0] === 0 && radio[1] === 2000) {
        const { data } = await axios.post(`/api/v1/product/product-filter`, {
          checked,
          brandsRadio,
        });
        setLoading(false);
        return setProducts(data?.products);
      }
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
        brandsRadio,
      });

      setProducts(data?.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Layout clName={"bg-warning-subtle"} title={"Get Discount at ShopKaro"}>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          background:
            "linear-gradient(to right,red, #fc5c7d,magenta,#FFA500,#088F8F, #6a82fb,violet)",
          transformOrigin: "left",
          position: "sticky",
          top: 0,
          width: "100%",
          height: "11px",
          zIndex: 20000,
        }}
      ></motion.div>
      <div className="d-flex flex-column home-page">
        <div className="shopkaro_logo">
          <h1>Shopkaro</h1>
        </div>
        <div
          style={{
            outline: "none",
            background: "linear-gradient(to top, #de6262, #ffb88c)",
          }}
        >
          <br />
          <CarouselComp />
          <div
            style={{
              outline: "none",
              background:
                "linear-gradient(to bottom,#f07767, #de6262, #eddbb7)",
              height: "100px",
              width: "100%",
            }}
          ></div>
          <LogoSlider />
        </div>
        <div className="row " style={{ margin: "20px 10px 10px 10px" }}>
          <div
            className="col-md-2"
            style={{
              borderRadius: "15px",
              backgroundImage: "linear-gradient(to bottom, #4776e6, #8e54e9)",
            }}
          >
            {/* get wishlist products */}
            <div
              className="d-flex align-items-center flex-column"
              style={{
                paddingBottom: "1rem",
                paddingTop: "1.7rem",
                borderBottom: "2px solid maroon",
              }}
            >
              <Link
                to="/dashboard/user/favourite-products"
                style={{ minWidth: "100px" }}
                className=" btn bg-success-subtle text-danger fw-bold"
              >
                Get WishList Products
              </Link>
            </div>
            {/* category filter */}
            <h5 className="text-center">Filter By Category</h5>
            <div
              className="d-flex flex-column"
              style={{
                textTransform: "capitalize",
                paddingBottom: "1rem",
                borderBottom: "2px solid maroon",
              }}
            >
              {categories?.map((cat) => (
                <Checkbox
                  key={cat._id}
                  className="text-light fs-6 fw-bold"
                  onChange={(e) => handleFilter(e.target.checked, cat._id)}
                >
                  {cat.name}
                </Checkbox>
              ))}
              {/* {categories?.map((cat) => (
                <div key={cat._id} className="text-light fs-6 fw-bold">
                  <input
                    type="checkbox"
                    value={cat.name}
                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                  />
                  {cat.name}
                </div>
              ))} */}
            </div>
            <div
              className="d-flex flex-column"
              style={{
                paddingBottom: "1rem",
                paddingTop: "1.7rem",
                borderBottom: "2px solid maroon",
              }}
            >
              <button
                className="delBtn"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
            {/* price filter */}
            <h5 className="text-center mt-4">Filter By Price</h5>
            <div
              className="d-flex flex-column"
              style={{
                paddingBottom: "1rem",
                borderBottom: "2px solid maroon",
              }}
            >
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio className="text-light fs-6 fw-bold" value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* brand filter */}
            <h5 className="text-center mt-4">Filter By Brands</h5>
            <div
              className="d-flex flex-column"
              style={{
                paddingBottom: "1rem",
                borderBottom: "2px solid maroon",
              }}
            >
              <Radio.Group onChange={(e) => setBrandRadio(e.target.value)}>
                <Radio className="text-light fs-6 fw-bold" value={"All"}>
                  All Brands
                </Radio>
                {Brands?.map((b) => (
                  <div key={b._id}>
                    <Radio className="text-light fs-6 fw-bold" value={b.brand}>
                      {b.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* chat bot */}
            <div className="d-flex justify-content-center align-items-center mb-5">
              <button
                className="mt-2 btn btn-primary"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <img height={30} width={30} src={chatbotImg} alt="chaticon" />
                ChatBot
              </button>
            </div>
            <div>
              <Modal
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                visible={isModalOpen}
              >
                <Chatbot />
              </Modal>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="d-flex justify-content-center">
              <h2 className="mb-4">
                <span
                  style={{ borderBottom: "2px solid green", color: "white" }}
                >
                  {" "}
                  All Products
                </span>
              </h2>
            </div>
            {!loading ? (
              <div>
                {products.length < 1 ? (
                  <h3 style={{ color: "white" }}>No Products Available</h3>
                ) : (
                  <div className="homeProduct d-flex justify-content-center gap-2 flex-wrap mx-2">
                    {products?.map((prod) => (
                      <motion.div
                        initial={{ rotate: "0deg", scale: 0 }}
                        animate={{ rotate: "360deg", scale: 1 }}
                        exit={{ rotate: "0deg", scale: 0 }}
                        transition={{ duration: 1, ease: "backIn" }}
                        whileTap={{ rotate: "1deg" }}
                        className="card"
                        key={prod._id}
                        style={{
                          width: "20rem",
                          margin: "0 10px 12px 10px",
                          height: "550px",
                          background: "transparent",
                          overflow: "hidden",
                          outline: "none",
                          border: "none",
                          borderRadius: "0",
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
                              style={{
                                height: "230px",
                                border: "4px solid magenta",
                                overflow: "hidden",
                                borderTopRightRadius: "2rem",
                                borderBottomLeftRadius: "2rem",
                              }}
                              alt="product_image"
                            />
                          )}
                        </Link>
                        <div
                          style={{
                            height: "20px",
                            background: "transparent",
                          }}
                        ></div>

                        <div
                          style={{
                            border: "6px solid aquamarine",
                            borderTopLeftRadius: "2rem",
                            borderBottomRightRadius: "2rem",
                          }}
                          className="card-body bg-info-subtle"
                        >
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
                              {prod?.name.substring(0, 40)}
                            </h5>
                            <h6
                              className="card-title"
                              style={{ height: "25px" }}
                            >
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
                            {(prod?.category?.name === "air conditioner" ||
                              prod?.category?.name === "tshirt") && (
                              <div
                                style={{
                                  color: "white",
                                  padding: "0 5px",
                                  background:
                                    "linear-gradient(to right, #c21500, #ffc500)",
                                }}
                              >
                                SALE IS LIVE
                              </div>
                            )}
                            {auth?.user ? (
                              <div
                                className="favIcon"
                                style={{ marginTop: "15px" }}
                              >
                                <div
                                  onClick={() =>
                                    favProductAddOrRemove(
                                      auth?.user._id,
                                      prod?._id
                                    )
                                  }
                                >
                                  {allFavProds?.find(
                                    (item) => item._id === prod._id
                                  ) ? (
                                    <FaHeart color="red" />
                                  ) : (
                                    <CiHeart />
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="d-flex gap-1"
                            style={{ marginTop: "-12px" }}
                          >
                            <button
                              className="btn mt-2 cartBtn"
                              style={{ background: "blue", color: "white" }}
                              onClick={() => navigate(`/product/${prod.slug}`)}
                            >
                              More Detail
                            </button>
                            {auth.user ? (
                              <button
                                className="btn mt-2 cartBtn"
                                style={{
                                  background: "orangered",
                                  color: "white",
                                }}
                                onClick={(e) => {
                                  if (
                                    prod?.category ===
                                      "660c3a703b009992de3e49a4" ||
                                    prod?.category ===
                                      "660c3a813b009992de3e49a9"
                                  ) {
                                    toast.error(
                                      "For Cloths Go to product details"
                                    );
                                    return;
                                  }
                                  if (
                                    cart?.findIndex(
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
                                {cart &&
                                cart?.find((item) => item._id === prod._id)
                                  ? "Go To Cart"
                                  : "Add To Cart"}
                              </button>
                            ) : null}
                            {auth.user &&
                              (auth.user.role ? (
                                <button
                                  className="btn mt-2 cartBtn"
                                  style={{
                                    background: "magenta",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    navigate(
                                      `/dashboard/admin/product/${prod.slug}`
                                    );
                                  }}
                                >
                                  Edit Product
                                </button>
                              ) : null)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-center ">
                {/* <h3>Loading...</h3> */}
                <SkeletonComp cards={30} />
              </div>
            )}
          </div>

          <VisitedProducts />

          <div className="p-5 d-flex justify-content-center ">
            {products && products.length < total && (
              <div>
                {radio || brandsRadio || checked ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    className="btn btn-primary"
                  >
                    {loading ? "Loading..." : "Load More..."}
                  </button>
                ) : (
                  <button className="btn btn-primary disabled">
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
