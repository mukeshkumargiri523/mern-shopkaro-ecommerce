import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import "antd/dist/reset.css";
import { SearchProvider } from "./context/searchContext";
import { CartProvider } from "./context/cartContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { ExistingCartProvider } from "./context/existingCartContext";
import { VisitedProductProvider } from "./context/visitedProductContext";
import { MobileViewProvider } from "./context/mobileViewContext";
import { BgChangerProvider } from "./context/bgChangerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <VisitedProductProvider>
          <ExistingCartProvider>
            <MobileViewProvider>
              <BgChangerProvider>
                <Router>
                  {/* <React.StrictMode> */}
                  <SkeletonTheme baseColor="#002244" highlightColor="#444">
                    <App />
                  </SkeletonTheme>
                  {/* </React.StrictMode> */}
                </Router>
              </BgChangerProvider>
            </MobileViewProvider>
          </ExistingCartProvider>
        </VisitedProductProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
