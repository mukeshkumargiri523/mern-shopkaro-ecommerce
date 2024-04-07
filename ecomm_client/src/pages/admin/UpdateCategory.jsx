import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function UpdateCategory() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");

  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

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
  }, []);

  //update category
  async function updateCategory(e) {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      photo && categoryData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/category/update-category-with-photo/${id}`,
        categoryData
      );
      if (data?.success) {
        toast.success(`${data?.category.name} updated successfully`);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  async function getCategoryDetails(slug) {
    try {
      const res = await axios.get(`/api/v1/category/get-category/${slug}`);
      if (res.data?.success) {
        setCategory(res.data.category);
        setName(res.data.category.name);
        setId(res.data.category._id);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout clName={"bg-info-subtle"} title={"Update Product"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2">
          <div className="col-md-4 bg-warning-subtle mt-2">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2 d-flex flex-column align-items-center">
            <h3>Update Category</h3>
            <div className="w-75 mb-1">
              <Select
                placeholder="Select A Category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  getCategoryDetails(value);
                }}
                value={category}
              >
                {categories?.map((cat) => (
                  <Option key={cat?._id} value={cat.slug}>
                    {cat.slug}
                  </Option>
                ))}
              </Select>
              <div className="mb-2">
                <label
                  htmlFor="uploadImg"
                  className="btn btn-outline-secondary"
                >
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
                      alt="category_photo"
                      height={"200px"}
                      className="img img-resposive"
                    />
                  </div>
                ) : null}
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

              <div className="mb-3">
                <button className="updBtn" onClick={updateCategory}>
                  UPDATE CATEGORY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateCategory;
