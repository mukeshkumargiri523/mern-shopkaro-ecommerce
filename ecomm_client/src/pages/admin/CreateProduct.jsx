import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const { Option } = Select;

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [brand, setBrand] = useState("");
  const [pics, setPics] = useState("");
  const [productId, setProductId] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);
  const [colorsArr, setColorsArr] = useState([]);
  const [sizesArr, setSizesArr] = useState([]);
  const navigate = useNavigate();

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

  async function createProduct(e) {

    e.preventDefault();
    if (
      category === "660c3a703b009992de3e49a4" ||
      category === "660c3a813b009992de3e49a9"
    ) {
      try {
        let sizes = sizesArr;
        let colors = colorsArr;
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("photo", photo);
        productData.append("quantity", quantity);
        productData.append("category", category);
        productData.append("brand", brand);
        productData.append("shipping", shipping);
        productData.append("colors", colors);
        productData.append("sizes", sizes);

        const { data } = await axios.post(
          `/api/v1/product/create-cloth-product`,
          productData
        );

        if (data?.success) {

          setProductId(data.product._id);
          toast.success(`${data?.product.name} created successfully`);
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    } else {
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("photo", photo);
        productData.append("quantity", quantity);
        productData.append("category", category);
        productData.append("brand", brand);
        productData.append("shipping", shipping);
        const { data } = await axios.post(
          `/api/v1/product/create-product`,
          productData
        );
        if (data?.success) {
          setProductId(data.product._id);
          toast.success(`${data?.product.name} created successfully`);
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    }
  }

  const uploadImageToCloudinary = async (pic) => {
    setImageUploadLoading(true);
    if (pic === undefined) {
      toast.error("Please select an image");

      setImageUploadLoading(false);
      return;
    }
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "mern_ecommerce_app");
    data.append("cloud_name", "dmhgxlch9");
    fetch("https://api.cloudinary.com/v1_1/dmhgxlch9/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPics(data.url.toString());
        setImageUploadLoading(false);
        toast.success("uploaded to cloud");
      })
      .catch((err) => {
        setPics("");
        console.log(err);
        setImageUploadLoading(false);
        toast.error("something went wrong while uploading Image to cloudinary");
      });
  };

  async function uploadImgToDb() {
    try {
      setImgUploadLoading(true);
      if (productId && pics) {
        const { data } = await axios.put(
          `/api/v1/product/upload-product-images`,
          {
            prodImage: pics,
            prodId: productId,
          }
        );
        if (data?.success) {
          setImgUploadLoading(false);
          setPics("");
          toast.success(`Product photo uploaded successfully`);
        } else {
          setPics("");
          setImgUploadLoading(false);
          toast.error("you can upload maximum 4 images");
        }
      } else {
        setImgUploadLoading(false);
        toast.error("product id and product image are required");
        toast.error("Product need to be created before uploading");
      }
    } catch (err) {
      setPics("");
      setImageUploadLoading(false);
      toast.error("something went wrong");
      console.log(err);
    }
  }

  function handleColors(e) {
    let { value, checked } = e.target;
    if (checked) {
      setColorsArr([...colorsArr, value]);
    } else {
      setColorsArr(colorsArr.filter((val) => val !== value));
    }
  }
  function handleSize(e) {
    let { value, checked } = e.target;
    if (checked) {
      setSizesArr([...sizesArr, value]);
    } else {
      setSizesArr(sizesArr.filter((val) => val !== value));
    }
  }

  return (
    <Layout clName={"bg-info-subtle"} title={"Create Product "}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2">
          <div className="col-md-4 mt-2 pt-2 bg-warning-subtle">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2 d-flex flex-column align-items-center">
            <h3>Create Product</h3>
            <div className="w-75 mb-1">
              <Select
                placeholder="Select A Category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((cat) => (
                  <Option key={cat?._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-2">
                <label htmlFor="uploadImg" className="admBtn">
                  {photo ? `Upload ${photo.name}` : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    id="uploadImg"
                    hidden
                  />
                </label>
              </div>
              <div className="mb-2">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-resposive"
                    />
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
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {category === "660c3a703b009992de3e49a4" ||
              category === "660c3a813b009992de3e49a9" ? (
                <>
                  <h4>Select multiple colors</h4>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="red"
                        id="redColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "red", color: "white" }}
                        htmlFor="redColorShirt"
                      >
                        Red
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="blue"
                        id="blueColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "blue", color: "white" }}
                        htmlFor="blueColorShirt"
                      >
                        Blue
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="yellow"
                        id="yellowColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "yellow" }}
                        htmlFor="yellowColorShirt"
                      >
                        Yellow
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="purple"
                        id="purpleColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "purple", color: "white" }}
                        htmlFor="purpleColorShirt"
                      >
                        Purple
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="maroon"
                        id="maroonColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "maroon", color: "white" }}
                        htmlFor="maroonColorShirt"
                      >
                        Maroon
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="green"
                        id="greenColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "green", color: "white" }}
                        htmlFor="greenColorShirt"
                      >
                        Green
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="white"
                        id="whiteColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "white" }}
                        htmlFor="whiteColorShirt"
                      >
                        White
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="colors"
                        value="grey"
                        id="greyColorShirt"
                        onChange={handleColors}
                      />
                      <label
                        className="form-check-label"
                        style={{ background: "grey", color: "white" }}
                        htmlFor="greyColorShirt"
                      >
                        Grey
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {category === "660c3a703b009992de3e49a4" ||
              category === "660c3a813b009992de3e49a9" ? (
                <>
                  <h4>Select Cloth Sizes</h4>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="30"
                        id="shirt30"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt30">
                        30 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="32"
                        id="shirt32"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt32">
                        32 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="34"
                        id="shirt34"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt34">
                        34 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="36"
                        id="shirt36"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt36">
                        36 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="38"
                        id="shirt38"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt38">
                        38 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="40"
                        id="shirt40"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt40">
                        40 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="42"
                        id="shirt42"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt42">
                        42 inch
                      </label>
                    </div>
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sizes"
                        value="44"
                        id="shirt42"
                        onChange={handleSize}
                      />
                      <label className="form-check-label" htmlFor="shirt44">
                        44 inch
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="mb-3">
                <button className="admBtn " onClick={createProduct}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
            <h4>Upload Multiple images</h4>
            <span style={{ color: "red", fontSize: "12px" }}>
              maximum 4 images can be uploaded
            </span>

            <div className="mt-2">
              <label
                htmlFor="uploadPhoto"
                style={{
                  background: imageUploadLoading ? "black" : "teal",
                  padding: "7px 10px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                {imageUploadLoading ? <FaRegClock /> : <></>} Upload To Cloud
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
                  id="uploadPhoto"
                  hidden
                />
              </label>
            </div>
            <button
              onClick={uploadImgToDb}
              style={{
                background: !imgUploadLoading ? "magenta" : "purple",
                border: "2px solid maroon",
              }}
              className="btn mt-2"
            >
              Final Image Upload
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
