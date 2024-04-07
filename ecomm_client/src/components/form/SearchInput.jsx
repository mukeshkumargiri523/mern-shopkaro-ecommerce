import React, { useEffect, useState } from "react";
import useSearchContext from "../../context/searchContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function SearchInput() {
  const { search, setSearch } = useSearchContext();
  const [navbarSearch, setNavbarSearch] = useState({
    keyword: "",
    result: [],
  });
  const [showNavResult, setShowNavResult] = useState(false);

  const navigate = useNavigate();
  async function handleSearch(e) {
    e.preventDefault();
    try {
      setSearch({ ...search, keyword: e.target.value });

      const { data } = await axios.get(
        `/api/v1/product/search-product/${search.keyword}`
      );
      setSearch({ ...search, result: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  }
  async function handleNavbarSearch(e) {
    e.preventDefault();
    try {
      setNavbarSearch({ ...navbarSearch, keyword: e.target.value });

      const { data } = await axios.get(
        `/api/v1/product/search-product/${search.keyword}`
      );
      setNavbarSearch({ ...navbarSearch, result: data });
      setShowNavResult(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1000) {
      setShowNavResult(false);
    } else {
      setShowNavResult(true);
    }
  }, [navbarSearch, window.innerWidth]);

  return (
    <div>
      <form className="d-flex gap-1 mt-2" onSubmit={handleSearch}>
        <input
          className="form-control mr-sm-2"
          style={{ height: "50px" }}
          type="search"
          placeholder="Search"
          value={search.keyword}
          aria-label="Search"
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
            handleNavbarSearch(e);
          }}
        />
        <div
          className="bg-danger-subtle"
          onClick={() => setShowNavResult(false)}
          style={{
            marginTop: "4px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <MdClose />
        </div>
        <button
          style={{ color: "white" }}
          className="btn btn-outline-danger my-2 my-sm-0"
          type="submit"
        >
          <FaSearch />
        </button>
      </form>
      {navbarSearch.result.length ? (
        <>
          {" "}
          {showNavResult ? (
            <div className="searchNavbarResult d-flex flex-column mt-2">
              {navbarSearch?.result?.map((prod) => (
                <div
                  key={prod?._id}
                  className="card d-flex flex-row"
                  style={{
                    width: "25rem",
                    marginLeft: "10px",
                    overflow: "hidden",
                    height: "80px",
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
                        className=""
                        style={{ height: "65px" }}
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
                      <h6
                        style={{ marginTop: "-15px" }}
                        className="card-title bg-danger-subtle"
                      >
                        {prod.name}
                      </h6>
                      <p
                        className="card-text"
                        style={{ fontSize: "10px", marginTop: "-15px" }}
                      >
                        {prod?.description.substring(0, 30)}...
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default SearchInput;

// import React from "react";
// import useSearchContext from "../../context/searchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

// function SearchInput() {
//   const { search, setSearch } = useSearchContext();
//   const navigate = useNavigate();
//   async function handleSearch(e) {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/search-product/${search.keyword}`
//       );
//       setSearch({ ...search, result: data });
//       navigate("/search");
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return (
//     <div>
//       <form className="d-flex gap-1 mt-2" onSubmit={handleSearch}>
//         <input
//           className="form-control mr-sm-2"
//           style={{ height: "50px" }}
//           type="search"
//           placeholder="Search"
//           value={search.keyword}
//           aria-label="Search"
//           onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
//         />
//         <button
//           style={{ color: "white" }}
//           className="btn btn-outline-danger my-2 my-sm-0"
//           type="submit"
//         >
//           <FaSearch />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SearchInput;
