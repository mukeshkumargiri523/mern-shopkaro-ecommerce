import React from "react";
import Skeleton from "react-loading-skeleton";

function WholeSkeleton() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <Skeleton style={{ width: "52px", height: "35px" }} />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="navbar-brand">
                <Skeleton style={{ width: "100px", height: "40px" }} />
              </div>

              <ul className="navbar-nav ms-auto  mb-lg-0">
                <Skeleton style={{ width: "200px", height: "40px" }} />
                <li className="nav-item">
                  <div className="nav-link ">
                    <Skeleton style={{ width: "70px" }} />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <Skeleton style={{ width: "70px" }} />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <Skeleton style={{ width: "70px" }} />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <Skeleton style={{ width: "70px" }} />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <Skeleton style={{ width: "90px", height: "60px" }} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <div className="container-fluid my-2 py-2 text-center">
          <div className="row p-3">
            <div className="col-md-4 mt-2">
              <Skeleton style={{ width: "100%", height: "90vh" }} />
            </div>
            <div className="col-md-4 mt-2">
              <div className=" userCard p-2 text-start">
                <h3>
                  <Skeleton style={{ width: "60%" }} />
                </h3>
                <h3>
                  <Skeleton style={{ width: "60%" }} />
                </h3>
                <h3>
                  <Skeleton style={{ width: "60%" }} />
                </h3>
                <h3>
                  <Skeleton style={{ width: "60%" }} />
                </h3>
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <Skeleton style={{ width: "100%", height: "90vh" }} />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer">
          <div className="d-flex flex-row flex-wrap">
            <div>
              <Skeleton style={{ width: "60%" }} />
              <Skeleton style={{ width: "100%" }} />

              <div>
                <Skeleton style={{ width: "130px", height: "70px" }} />
                <Skeleton style={{ width: "130px", height: "70px" }} />
              </div>
            </div>

            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />
            <Skeleton style={{ marginBottom: "5px" }} />

            <div>
              <Skeleton style={{ width: "50px" }} />
              <div className="social_icons">
                <Skeleton style={{ width: "100%" }} />
              </div>
            </div>
            <div></div>
          </div>

          <h4 className="text-center">
            <Skeleton style={{ width: "100%", height: "40px" }} />
          </h4>

          <p className="text-center ml-4">
            <Skeleton count={2} style={{ marginLeft: "5px" }} />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default WholeSkeleton;
