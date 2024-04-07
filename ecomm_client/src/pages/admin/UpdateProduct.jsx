import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      setName();
      if (data?.success) {
        setName(data?.product.name);
        setId(data?.product._id);
        setDescription(data?.product.description);
        setPrice(data?.product.price);
        setPhoto(data?.product.photo);
        setQuantity(data?.product.quantity);
        setShipping(data?.product.shipping);
        setBrand(data?.product?.brand);
        setCategory(data?.product.category._id);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, [slug]);

  //update product
  async function updateProduct(e) {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        toast.success(`${data?.product.name} updated successfully`);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      toast.error("Something went wrong");
    }
  }

  //delete product
  async function deleteProduct() {
    try {
      let answer = window.prompt("Are you sure to delete product ?");
      if (!answer) return;
      await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success(`deleted successfully`);
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout clName={"bg-info-subtle"} title={"Update Product"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2">
          <div className="col-md-4 pt-3 bg-warning-subtle mt-2">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2  d-flex flex-column align-items-center">
            <h3>Update Product</h3>
            <div className="w-75 mb-1">
              <Select
                placeholder="Select A Category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((cat) => (
                  <Option key={cat?._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-2">
                <label htmlFor="uploadImg" className="btn btn-outline-danger">
                  {photo ? `Upload ${photo.name}` : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      return setPhoto(e.target.files[0]);
                    }}
                    id="uploadImg"
                    hidden
                  />
                </label>
              </div>
              <div className="mb-2">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-resposive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    {id && (
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-resposive"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={name}
                  placeholder="Write product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={brand}
                  placeholder="Write product brand"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <textarea
                  type="textarea"
                  value={description}
                  placeholder="Write Product Desctiption"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  value={price}
                  placeholder="Write product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <Select
                  placeholder="Select Shipping"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="updBtn" onClick={updateProduct}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="delBtn" onClick={deleteProduct}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
