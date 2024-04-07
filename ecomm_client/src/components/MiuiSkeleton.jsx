import React from "react";
import Skeleton from "react-loading-skeleton";
// material ui skeleton
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const numb = [1, 2, 3];

function MiuiSkeleton() {
  return (
    <>
      <div>
        <Skeleton />
        <Skeleton count={5} />
      </div>

      {/* <Grid container wrap="nowrap"> */}
      {/* {Array.from(new Array(3), numb).map((num, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {num ? ( */}
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
      {/* ) : null}
          {num ? (
            <Box sx={{ width: 210, marginRight: 0.5 }}> */}
      {/* <Skeleton />
      <Skeleton width="100" height={90} /> */}
      {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <Skeleton width="50" height={20} />
                <Skeleton width="50" height={20} />
              </div>
            </Box>
          ) : null}
        </Box>
      ))} */}
      {/* </Grid> */}
    </>
  );
}

export default MiuiSkeleton;
