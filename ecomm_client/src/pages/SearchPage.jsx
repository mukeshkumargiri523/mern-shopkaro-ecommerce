import React from "react";
import useSearchContext from "../context/searchContext";
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../context/authContext";
import useCartContext from "../context/cartContext";
import toast from "react-hot-toast";

function SearchPage() {
  const { search } = useSearchContext();
  const { auth } = useAuthContext();
  const { cart, setCart } = useCartContext();
  const navigate = useNavigate();
  return (
    <Layout clName={"bg-success-subtle"} title={"Product Search Results"}>
      <div className="container text-center mb-4">
        <h1>Search Results</h1>
        <h6>
          {search?.result.length < 1
            ? "Sorry No Products Found"
            : `Found ${search?.result.length}`}
        </h6>
        <div className="searchProduct d-flex gap-2 mt-3 flex-wrap">
          {search?.result?.map((prod) => (
            <div
              key={prod?._id}
              className="card"
              style={{
                width: "20rem",
                marginLeft: "20px",
                overflow: "hidden",
                height: "500px",
                border: "2px solid purple",
              }}
            >
              <Link
                key={prod._id}
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
              <div
                style={{ border: "2px solid salmon" }}
                className="card-body bg-info-subtle"
              >
                <Link
                  key={prod._id}
                  to={`/product/${prod.slug}`}
                  style={{ textDecoration: "none", color: "black" }}
                  className="product_link"
                >
                  <h5
                    className="card-title bg-danger-subtle"
                    style={{ height: "70px", marginTop: "-10px" }}
                  >
                    {prod.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ overflow: "hidden", marginTop: "-10px" }}
                  >
                    {prod?.description.substring(0, 100)}...
                  </p>
                  <p
                    className="card-text"
                    style={{ fontWeight: "500", marginTop: "-10px" }}
                  >
                    $ {prod?.price}
                  </p>
                </Link>
                <div className="d-flex gap-3">
                  <button
                    className="btn  btn-primary ms-2"
                    onClick={() => navigate(`/product/${prod.slug}`)}
                  >
                    More Detail
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      if (cart.findIndex((item) => item._id === prod._id) < 0) {
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
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
