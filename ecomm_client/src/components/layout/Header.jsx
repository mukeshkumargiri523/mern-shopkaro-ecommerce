import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import shopkaroLogo from "../../images/shopkaro_logo_1.png";
import useAuthContext from "../../context/authContext";
import { toast } from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import useCartContext from "../../context/cartContext";
import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import useVisitedProductContext from "../../context/visitedProductContext";
import useMobileViewContext from "../../context/mobileViewContext";
import useBgChangerContext from "../../context/bgChangerContext";
import { CartMemoComponent } from "../cart/CartComponent";

function Header() {
  const { auth, setAuth } = useAuthContext();
  const { mobileView, setMobileView } = useMobileViewContext();
  const { bgChanger, setBgChanger } = useBgChangerContext();
  const { cart } = useCartContext();
  const { visitedProduct, setVisitedProduct } = useVisitedProductContext();
  const location = useLocation();
  const [show, setShow] = useState("top");
  const [showCart, setShowCart] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navColor, setNavColor] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState({});

  const categories = useCategory();

  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    setVisitedProduct([]);
    localStorage.removeItem("visitedProduct");

    toast.success("Logout successfully");
  }

  function handleMobileViewOpen() {
    if (mobileView === false) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }
  useEffect(() => {
    if (window.innerWidth >= 1000) {
      setMobileView(false);
    }
  }, [window.innerWidth]);

  const controlNavbar = () => {
    if (window.innerWidth > 991) {
      setNavColor("background: linear-gradient(to right, #3a7bd5, #00d2ff)");
      if (window.scrollY > 300) {
        if (window.scrollY > lastScrollY) {
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    } else {
      setNavColor("background: linear-gradient(to right, #3a7bd5, #00d2ff)");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileView(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const getLocationInfo = async () => {
    try {
      const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await res.json();
      setGeoInfo(data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to get location");
    }
  };

  const getVisitorIp = async () => {
    try {
      const res = await fetch(`https://api.ipify.org`);
      const data = await res.text();
      setIpAddress(data);
      getLocationInfo();
    } catch (err) {
      console.log(err);
      toast.error("Unable to get location");
    }
  };

  useEffect(() => {
    if (auth.user) {
      getVisitorIp();
    }
  }, []);

  return (
    <>
      <nav className={`navbar header navbar-expand-lg ${show}`}>
        <div className="container-fluid">
          <button
            onClick={handleMobileViewOpen}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            style={{ background: navColor }}
            className="collapse navbar-collapse"
            id="navbarTogglerDemo01"
          >
            <Link to="/" className="navbar-brand">
              <img src={shopkaroLogo} alt="logo" />
            </Link>

            <ul className="navbar-nav ms-auto  mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link " aria-current="page">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(	0, 159, 194,0.6),rgba(13,10,11,0.6))",
                  }}
                >
                  <li>
                    <Link
                      style={{ color: "purple" }}
                      className="dropdown-item"
                      to={"/categories"}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat?._id}>
                      <Link
                        className="dropdown-item"
                        style={{
                          color: "purple",
                        }}
                        to={`/category/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  style={{
                    color: "white",
                    backgroundColor: "transparent",
                    border: "none",
                    fontWeight: "normal",
                  }}
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Bg Changer
                </NavLink>
                <ul
                  className="dropdown-menu bg-dropdown"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(	0, 159, 194,0.6),rgba(13,10,11,0.6))",
                  }}
                >
                  <li onClick={() => setBgChanger("bg-danger-subtle")}>
                    <button className="dropdown-item ">
                      <div className="bg-danger"></div>
                      Red
                    </button>
                  </li>
                  <li onClick={() => setBgChanger("bg-info-subtle")}>
                    <button className="dropdown-item ">
                      <div className="bg-primary"></div>
                      Blue
                    </button>
                  </li>{" "}
                  <li onClick={() => setBgChanger("bg-warning-subtle")}>
                    <button className="dropdown-item ">
                      <div className="bg-warning"></div>
                      Yellow
                    </button>
                  </li>{" "}
                  <li onClick={() => setBgChanger("bg-success-subtle")}>
                    <button className="dropdown-item ">
                      <div className="bg-success"></div>
                      Green
                    </button>
                  </li>
                  <li onClick={() => setBgChanger("bg-light")}>
                    <button className="dropdown-item ">
                      <div className="bg-light"></div>
                      White
                    </button>
                  </li>
                </ul>
              </li>

              <li className="nav-item ">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>

              {!auth.user ? (
                <li className="nav-item ">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      style={{
                        backgroundColor: "transparent",
                        borderBottom: "none",
                      }}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      User
                    </NavLink>
                    <ul
                      className="dropdown-menu "
                      style={{
                        background:
                          "linear-gradient(to right, rgba(	0, 159, 194,0.6),rgba(13,10,11,0.6))",
                      }}
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          style={{ color: "purple" }}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          style={{ color: "purple" }}
                          className="dropdown-item "
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li
                className="nav-item "
                style={{ width: "110px", marginRight: "2px" }}
              >
                <div onClick={() => setShowCart(true)} className="nav-link">
                  Cart{" "}
                  <FaShoppingCart
                    style={{ fontSize: "25px", color: "purple" }}
                  />
                  <Badge
                    style={{ marginTop: "-20px", marginLeft: "-16px" }}
                    count={cart?.length}
                  ></Badge>
                </div>
              </li>
              {auth.user &&
                (auth.user ? (
                  <div
                    style={{ marginLeft: "-15px" }}
                    className="header_username d-flex flex-row "
                  >
                    <img
                      src={`/api/v1/auth/user-photo/${auth.user.email}`}
                      className="profile-img"
                      style={{
                        height: "30px",
                        borderRadius: "50%",
                        width: "30px",
                        marginLeft: "-10px",
                      }}
                      alt="product_image"
                    />
                    <div className="d-flex flex-column gap-1">
                      <span style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                        {auth.user.name}
                      </span>
                      <span style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                        {geoInfo?.city}, {geoInfo?.regionName}
                      </span>
                    </div>
                  </div>
                ) : null)}
            </ul>
          </div>
        </div>
      </nav>
      {showCart && <CartMemoComponent setShowCart={setShowCart} />}
    </>
  );
}

export default Header;
