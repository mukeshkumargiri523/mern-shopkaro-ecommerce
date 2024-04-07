import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CardSkeleton from "../components/CardSkeleton";
import useCartContext from "../context/cartContext";
import useAuthContext from "../context/authContext";
import toast from "react-hot-toast";
import { Modal, Radio } from "antd";
import RatingForm from "../components/form/RatingForm";
import { IoStar } from "react-icons/io5";
import useVisitedProductContext from "../context/visitedProductContext";
import CommentForm from "../components/form/CommentForm";
import Loader from "../components/Loader";
import ReactImageMagnify from "react-image-magnify";

function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [similarProduct, setSimilarProduct] = useState([]);
  const [rating, setRating] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleCart, setToggleCart] = useState(true);
  const { cart, setCart } = useCartContext();
  const { auth } = useAuthContext();
  const { visitedProduct, setVisitedProduct } = useVisitedProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [updatedRating, setUpdatedRating] = useState("");
  const [productComments, setProductComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsUsers, setCommentsUsers] = useState([]);
  const [radioColor, setRadioColor] = useState("");
  const [radioSize, setRadioSize] = useState("");
  const navigate = useNavigate();
  const createProductReview = async (e) => {
    try {
      e.preventDefault();
      setCommentLoading(true);
      const { data } = await axios.post(`/api/v1/product/create-user-comment`, {
        userId: auth?.user?._id,
        productId: product?._id,
        comment: comment,
      });
      setIsReviewModalOpen(false);
      if (data.success) {
        toast.success("Review added successfully");
      }
      if (data.success === false) {
        toast.error("Comment in this product already added by you");
      }
      getProductComment(product?._id);
      setCommentLoading(false);
    } catch (err) {
      setCommentLoading(false);
      console.log(err);
    }
  };

  //get product comments
  const getProductComment = async (pid) => {
    setCommentLoading(true);

    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product-comment/${pid}`
      );
      if (data.success === true) {
        setProductComments(data?.existingProduct?.comment);
        setCommentsUsers(data?.existingProduct?.users);
        setCommentLoading(false);
      } else {
        setCommentLoading(false);
      }
    } catch (err) {
      setCommentLoading(false);

      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      // setMainDetailImg(`/api/v1/product/product-photo/${product._id}`);
      getProductRating(data?.product?._id);
      getProductComment(data?.product?._id);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
      settingVisitedProduct(data?.product);
    } catch (err) {
      console.log(err);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //handle rating of product
  async function handleRating(e) {
    e.preventDefault();
    try {
      const {
        data,
      } = await axios.put(
        `/api/v1/product/update-rating/${auth?.user?._id}/${product?._id}`,
        { rating: updatedRating }
      );
      if (data?.success) {
        toast.success(data?.message);
        setUpdatedRating("");
        setIsModalOpen(false);
        getProductRating(data.product?._id);
        // getRating();
      } else if (data.success === false) {
        toast.error(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  }
  //get Product rating
  async function getProductRating(uid) {
    try {
      const { data } = await axios.get(`/api/v1/product/get-rating/${uid}`);
      if (data.success) {
        let newRating = Math.round(data?.productRating);
        setRating(newRating);
        setRatingCount(data?.productRatingCount);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  }
  //setting visited product in localstorage
  async function settingVisitedProduct(currentProduct) {
    if (currentProduct) {
      let parsedItem = JSON.parse(localStorage.getItem("visitedProduct"));
      if (parsedItem) {
        setVisitedProduct(parsedItem);
        let alreadyItem = parsedItem.filter((singItm) => {
          if (currentProduct?._id === singItm?._id) {
            return singItm;
          }
        });
        if (alreadyItem.length !== 0) {
          return null;
        } else {
          setVisitedProduct([
            ...visitedProduct,
            { ...currentProduct, userId: auth?.user?._id },
          ]);

          localStorage.setItem(
            "visitedProduct",
            JSON.stringify([
              ...visitedProduct,
              { ...currentProduct, userId: auth?.user?._id },
            ])
          );
        }
      } else {
        setVisitedProduct([
          ...visitedProduct,
          { ...currentProduct, userId: auth?.user?._id },
        ]);

        localStorage.setItem(
          "visitedProduct",
          JSON.stringify([
            ...visitedProduct,
            { ...currentProduct, userId: auth?.user?._id },
          ])
        );
      }
    }
  }

  useEffect(() => {
    params?.slug && getProduct();

    // if (product) {
    //   let togCart = cart.find((item) => item._id === product._id)
    //     ? false
    //     : true;
    //   setToggleCart(togCart);
    // }
  }, [params?.slug]);

  useEffect(() => {
    if (product) {
      let togCart = cart.find((item) => item?._id === product?._id)
        ? false
        : true;
      setToggleCart(togCart);
    }
  }, [product]);

  return (
    <Layout clName={"bg-danger-subtle"} title={"Product Details"}>
      <div className=" row  mt-4 mx-4 p-2 d-flex align-items-center ">
        <div className="col-md-6 completeFrame">
          <div className="outerFrame">
            <div className="detailsImage  px-2 d-flex  justify-content-center align-items-center">
              <div>
                {product && (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        // isFluidWidth: true,
                        src: `/api/v1/product/product-photo/${product?._id}`,
                        width: 480,
                        height: 420,
                        // enlargedImageContainerDimensions,
                      },
                      largeImage: {
                        src: `/api/v1/product/product-photo/${product?._id}`,
                        width: 600,
                        height: 850,
                      },
                    }}
                  />
                  // <img
                  //   src={`/api/v1/product/product-photo/${product._id}`}
                  //   className="mx-5"
                  //   alt="product_image"
                  //   style={{ maxHeight: "450px", maxWidth: "350px" }}
                  // />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-2 mx-4 col-md-5"
          style={{ borderLeft: "2px solid magenta" }}
        >
          <div className="d-flex justify-content-center">
            <h2 style={{ borderBottom: "3px solid salmon", maxWidth: "250px" }}>
              Product Detail
            </h2>
          </div>
          <h5
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-3 fw-bold text-secondary"
          >
            Name:{" "}
            <span className="fw-bold fs-4 text-black">{product?.name}</span>
          </h5>
          <h6
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-3 fw-bold text-secondary"
          >
            Desciption:{" "}
            <span className="fw-bold fs-4 text-black">
              {product?.description}
            </span>
          </h6>
          <h6
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-3 fw-bold text-secondary"
          >
            Price:{" "}
            <span className="fw-bold fs-4 text-black">${product?.price}</span>
          </h6>
          <h6
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-3 fw-bold text-secondary"
          >
            Category:{" "}
            <span className="fw-bold fs-4 text-black">
              {product?.category?.name}
            </span>
          </h6>
          <h6
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-3 fw-bold text-secondary"
          >
            Shipping:{" "}
            <span className="fw-bold fs-4 text-black">
              {product?.shipping === true ? "Yes" : "No"}
            </span>
          </h6>
          <div
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
            className="fs-4 fw-bold text-secondary"
          >
            {" "}
            Rating:{" "}
            <span className="fw-semibold fs-5 text-danger">
              {rating === 0 || rating === undefined ? null : rating === 1 ? (
                <IoStar />
              ) : rating === 2 ? (
                <>
                  <IoStar />
                  <IoStar />
                </>
              ) : rating === 3 ? (
                <>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </>
              ) : rating === 4 ? (
                <>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </>
              ) : (
                <>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                </>
              )}
            </span>{" "}
            <span className="fw-semibold fs-6 ">
              {"("}
              {ratingCount}
              {")"}
            </span>
          </div>
          <div
            style={{ paddingBottom: "6px", borderBottom: "1px solid purple" }}
          >
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="btn btn-success fs-5 p-1 mt-1 fw-semibold text-light"
            >
              Rate This Product
            </button>
          </div>
          {product?.category?._id === "660c3a703b009992de3e49a4" ||
          product?.category?._id === "660c3a813b009992de3e49a9" ? (
            <>
              <div>
                <h3>Select color</h3>
                <Radio.Group onChange={(e) => setRadioColor(e.target.value)}>
                  {product?.colors?.length &&
                    product?.colors?.map((col, i) => (
                      <div key={i}>
                        <Radio
                          className="fs-6 fw-bold"
                          value={col}
                          style={{
                            background: `${col}`,
                            width: "45px",
                            padding: "3px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    ))}
                </Radio.Group>
              </div>
              <div>
                <h3>Select size</h3>
                <Radio.Group onChange={(e) => setRadioSize(e.target.value)}>
                  {product?.sizes?.length &&
                    product?.sizes?.map((siz, i) => (
                      <div key={i}>
                        <Radio className="text-black fs-6 fw-bold" value={siz}>
                          {siz}
                        </Radio>
                      </div>
                    ))}
                </Radio.Group>
              </div>
            </>
          ) : (
            <h5>No selection</h5>
          )}
          <button
            className="btn btn-info text-light mt-2 fw-bold"
            onClick={() => {
              if (!auth?.user?._id) {
                toast.error("Please login to add to cart");
                return;
              }
              let presCart = cart.find((item) => item?._id === product?._id);
              if (presCart) {
                return;
              }
              if (
                product?.category?._id === "660c3a703b009992de3e49a4" ||
                product?.category?._id === "660c3a813b009992de3e49a9"
              ) {
                if (!radioColor || !radioSize) {
                  toast.error("select color and size first");
                  return;
                }
                setCart([
                  ...cart,
                  {
                    ...product,
                    userId: auth?.user.email,
                    color: radioColor,
                    size: radioSize,
                  },
                ]);
                setToggleCart(false);

                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...cart,
                    {
                      ...product,
                      userId: auth?.user.email,
                      color: radioColor,
                      size: radioSize,
                    },
                  ])
                );

                toast.success("Items added to cart");
              } else {
                setCart([...cart, { ...product, userId: auth?.user.email }]);
                setToggleCart(false);

                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...cart,
                    { ...product, userId: auth?.user.email },
                  ])
                );

                toast.success("Items added to cart");
              }
            }}
            disabled={!toggleCart}
          >
            {cart.find((item) => item?._id === product?._id)
              ? "Go To Cart"
              : "Add To Cart"}
          </button>
        </div>
      </div>
      {/* rating modal */}
      <div>
        <Modal
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          visible={isModalOpen}
        >
          <RatingForm
            value={updatedRating}
            setValue={setUpdatedRating}
            handleSubmit={handleRating}
          />
        </Modal>
      </div>
      <div className="row w-full p-6 container mt-3 mb-3 d-flex mx-5 justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
          <h3>Product Images</h3>
        </div>
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          {product.productImages &&
            product.productImages.map((imge) => (
              <img
                src={imge}
                className="prodImgs"
                style={{ height: "230px", width: "300px" }}
                alt="product_image"
              />
            ))}
        </div>
      </div>
      <div className="row w-full p-6 container mt-3 mb-3 d-flex flex-column mx-5 justify-content-center ">
        <div className="d-flex justify-content-center">
          <h2>Related Products</h2>
        </div>
        {similarProduct.length < 1 ? (
          <p className="text-center fw-bold">No Related Product Found</p>
        ) : (
          <div>
            {!loading ? (
              <div className="similarProduct d-flex gap-2 justify-content-center flex-wrap">
                {similarProduct?.map((prod) => (
                  <div
                    key={prod?._id}
                    className="card"
                    style={{
                      width: "22rem",
                      marginLeft: "16px",
                      height: "500px",
                    }}
                  >
                    <Link
                      key={prod?._id}
                      to={`/product/${prod?.slug}`}
                      style={{ textDecoration: "none" }}
                      className="product_link"
                    >
                      {prod && (
                        <img
                          src={`/api/v1/product/product-photo/${prod?._id}`}
                          className="card-img-top"
                          style={{ height: "230px" }}
                          alt="product_image"
                        />
                      )}
                    </Link>
                    <div
                      className="card-body"
                      style={{ backgroundColor: "#af69ee" }}
                    >
                      <Link
                        key={prod?._id}
                        to={`/product/${prod?.slug}`}
                        style={{ textDecoration: "none", color: "black" }}
                        className="product_link"
                      >
                        <h5
                          className="card-title"
                          style={{ height: "70px", marginTop: "-10px" }}
                        >
                          {prod?.name}
                        </h5>
                        <p
                          className="card-text"
                          style={{
                            overflow: "hidden",
                            height: "100px",
                            marginTop: "-10px",
                          }}
                        >
                          {prod?.description.substring(0, 200)}...
                        </p>
                      </Link>
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          className="card-text"
                          style={{
                            fontWeight: "500",
                            fontSize: "20px",
                            marginTop: "-10px",
                          }}
                        >
                          $ {prod?.price}
                        </p>

                        <button
                          onClick={() => navigate(`/product/${prod?.slug}`)}
                          className="btn ms-2  btn-danger"
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <CardSkeleton cards={4} />
              </>
            )}
          </div>
        )}
      </div>
      <div className="row container w-full mt-3 mb-3 d-flex flex-column mx-5 justify-content-between">
        <div className="d-flex justify-content-center">
          <h2>Products Review</h2>
        </div>
        {/* review modal */}
        {!commentLoading ? (
          <div className="bg-success-subtle w-100 text-center">
            <button
              onClick={() => {
                setIsReviewModalOpen(true);
              }}
              className="btn btn-warning border-2 border-danger fs-5 p-1 mt-1 fw-semibold text-light"
            >
              Review Product
            </button>
            <Modal
              onCancel={() => setIsReviewModalOpen(false)}
              footer={null}
              visible={isReviewModalOpen}
            >
              <CommentForm
                value={comment}
                setValue={setComment}
                handleSubmit={createProductReview}
              />
            </Modal>
            <div>
              {productComments.length ? <h4>Product comments</h4> : null}
              <div className="d-flex flex-row justify-content-between">
                <div>
                  {productComments.length ? (
                    <div>
                      {productComments.map((com, i) => {
                        return (
                          <h6
                            style={{
                              borderBottom: "2px solid green",
                              display: "flex",
                              gap: "10px",
                              justifyContent: "start",
                            }}
                            key={i}
                          >
                            {i + 1}. <span className="text-danger">{com}</span>
                          </h6>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                <div>
                  {commentsUsers.length ? (
                    <div>
                      {commentsUsers.map((use, i) => {
                        return (
                          <h6
                            style={{ borderBottom: "2px solid green" }}
                            key={i}
                          >
                            {use.name}
                          </h6>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  );
}

export default ProductDetailsPage;
