import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div
      style={{ height: "100vh", backgroundColor: "yellow" }}
      className="d-flex flex-column  justify-content-center align-items-center"
    >
      <h1 className="text-center">Redirecting to you in {count} seconds</h1>
      <div className="spinner-border text-danger" role="status"></div>
    </div>
  );
};

export default Spinner;
