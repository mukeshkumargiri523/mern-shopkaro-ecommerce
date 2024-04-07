import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonComp({ cards }) {
  return (
    <div>
      {/* <div className="row" style={{ margin: "20px 0 10px 10px" }}> */}
      {/* <div
          className="col-md-2"
          style={{
            borderRadius: "15px",
            backgroundImage: "linear-gradient(to bottom, #4776e6, #8e54e9)",
          }}
        >
        
          <h5 className="text-center">
            <Skeleton />
          </h5>
          <div
            className="d-flex flex-column"
            style={{ paddingBottom: "1rem", borderBottom: "2px solid maroon" }}
          >
            <Skeleton count={8} style={{ marginBottom: "4px" }} />
          </div>
          <div
            className="d-flex flex-column"
            style={{
              paddingBottom: "1rem",
              paddingTop: "1.7rem",
              borderBottom: "2px solid maroon",
            }}
          >
            <button className="delBtn" onClick={() => window.location.reload()}>
              <Skeleton style={{ height: "30px" }} />
            </button>
          </div>
     
          <h5 className="text-center mt-4">
            {" "}
            <Skeleton />
          </h5>
          <div
            className="d-flex flex-column"
            style={{ paddingBottom: "1rem", borderBottom: "2px solid maroon" }}
          >
            <Skeleton count={8} style={{ marginBottom: "4px" }} />
          </div>
     
          <h5 className="text-center mt-4">Filter By Brands</h5>
          <div
            className="d-flex flex-column"
            style={{ paddingBottom: "1rem", borderBottom: "2px solid maroon" }}
          >
            <Skeleton count={8} style={{ marginBottom: "4px" }} />
          </div>
        </div> */}
      {/* <div className="col-md-9 ml-3 ">
          <h2 className="text-center">All Products</h2> */}

      <div>
        <div className="homeProduct d-flex justify-content-center gap-2 flex-wrap mx-2">
          {Array(cards)
            .fill(0)
            ?.map((item, i) => (
              <div
                className="card"
                key={i}
                style={{
                  width: "20rem",
                  margin: "0 10px 12px 10px",
                  height: "500px",
                }}
              >
                <Skeleton style={{ height: "230px", marginBottom: "4px" }} />

                <div className="card-body bg-info-subtle">
                  <Skeleton style={{ width: "80%", marginBottom: "4px" }} />

                  <Skeleton
                    style={{
                      width: "100%",
                      height: "90px",
                      marginBottom: "4px",
                    }}
                  />

                  <Skeleton
                    style={{
                      width: "20%",
                      marginTop: "4px",
                    }}
                  />

                  {/* <div className="d-flex gap-1 mt-2"> */}
                  <Skeleton
                    style={{
                      width: "40%",
                      height: "40px",
                      marginBottom: "4px",
                    }}
                  />
                  <Skeleton
                    style={{
                      width: "40%",
                      height: "40px",
                      marginBottom: "4px",
                    }}
                  />
                  {/* </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
}

export default SkeletonComp;
