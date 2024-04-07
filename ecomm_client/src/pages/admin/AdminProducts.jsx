import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-all-product`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout clName={"bg-info-subtle"} title={"Product list"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2 ">
          <div className="col-md-3 pt-3 mt-2 bg-warning-subtle">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex flex-column">
            <h3 className="text-center">All Products List</h3>
            <div className="adminProduct product_group">
              {products?.map((prod) => (
                <Link
                  key={prod._id}
                  to={`/dashboard/admin/product/${prod.slug}`}
                  className="product_link"
                >
                  <div className="card" style={{ width: "18rem" }}>
                    {prod && (
                      <img
                        src={`/api/v1/product/product-photo/${prod._id}`}
                        className="card-img-top"
                        alt="product_image"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{prod.name}</h5>
                      <p className="card-text">
                        {prod.description.substring(0, 150)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
