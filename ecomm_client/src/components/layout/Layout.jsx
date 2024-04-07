import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import useMobileViewContext from "../../context/mobileViewContext";
import useBgChangerContext from "../../context/bgChangerContext";
import GoToTop from "../GoToTop";

function Layout({ clName, children, title, description, keywords, author }) {
  const { mobileView, setMobileView } = useMobileViewContext();
  const { bgChanger } = useBgChangerContext();
  useEffect(() => {
    if (window.innerWidth > 1000) {
      setMobileView(false);
    }
  }, [window.innerWidth]);
  return (
    <HelmetProvider>
      {/* <div className={clName}> */}
      <div className={clName}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className={bgChanger} style={{ minHeight: "80vh" }}>
          <div className={mobileView ? `incMt` : `decMt`}>
            <Toaster />
            {children}
            <GoToTop />
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

Layout.defaultProps = {
  title: "ShopKaro App",
  description: "mern stack project",
  keywords: "mern, react, ecommerce, shopkaro, project, node",
  author: "mukesh",
};

export default Layout;
