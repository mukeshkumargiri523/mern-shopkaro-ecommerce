import React from "react";
import Skeleton from "react-loading-skeleton";

function CardSkeleton({ cards }) {
  return (
    <div>
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
    </div>
  );
}

export default CardSkeleton;
