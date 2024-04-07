import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function CategoriesPage() {
  const categories = useCategory();
  return (
    <Layout clName={"bg-warning-subtle"} title={"Categories"}>
      <div className="d-flex flex-column m-3 justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
          <h2>All Categories</h2>
        </div>
        <div className="container">
          <div className="row">
            {categories.map((cat) => (
              <div key={cat?._id} className="col-md-6 mt-5 mb-3 gx-3">
                <Link
                  to={`/category/${cat.slug}`}
                  style={{ textTransform: "capitalize", marginBottom: "20px" }}
                  className="btn p-2 bg-info  fs-5 fw-bold"
                >
                  <div className="cat_images d-flex gap-2 flex-column">
                    <img
                      src={`/api/v1/category/category-photo/${cat._id}`}
                      alt="cat_image"
                      style={{ width: "150px" }}
                    />
                    <p>{cat.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CategoriesPage;
