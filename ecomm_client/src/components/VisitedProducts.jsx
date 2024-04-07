import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
function VisitedProducts() {
  const [visitedProds, setVisitedProds] = useState();
  const bottomRef = useRef(null);
  async function getVisitedProducts() {
    let parsedItem = JSON.parse(localStorage.getItem("visitedProduct"));
    if (parsedItem) {
      setVisitedProds(parsedItem);
    }
  }
  useEffect(() => {
    getVisitedProducts();
  }, []);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [visitedProds]);
  return (
    <div
      className="col-md-2 visitedProducts"
      style={{
        borderRadius: "15px",
        textAlign: "center",
        backgroundImage: "linear-gradient(to left, #ddd6f3, #faaca8)",
      }}
    >
      <h3
        style={{
          borderBottom: "2px solid maroon",
        }}
      >
        Recently Visited
      </h3>
      <ul
        className="visitedBox d-flex align-items-center flex-column"
        style={{
          listStyle: "none",
          paddingBottom: "1rem",
          overflowY: "auto",
          paddingLeft: "0px",
          borderBottom: "2px solid maroon",
        }}
      >
        {visitedProds && (
          <div>
            {visitedProds.map((item, id) => (
              <li style={{ width: "100%", marginBottom: "3px" }} key={id}>
                <Link
                  to={`/product/${item.slug}`}
                  style={{ textDecoration: "none" }}
                  className="product_link"
                >
                  <div
                    className="fav-list d-flex  align-items-center justify-content-start"
                    style={{
                      borderRadius: "8px",
                      padding: "4px 12px",
                      borderBottom: "2px solid #FF69B4",
                      background: "linear-gradient(to right, #efefbb, #d4d3dd)",
                    }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${item?._id}`}
                      style={{
                        borderRadius: "10px",
                        height: "85px",
                        width: "85px",
                        marginRight: "14px",
                        border: "2px solid #E0115F",
                      }}
                      alt="product_image"
                    />
                    <div>
                      <h6 className="text-dark">
                        {item?.name.substring(0, 20)}...
                      </h6>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default VisitedProducts;
