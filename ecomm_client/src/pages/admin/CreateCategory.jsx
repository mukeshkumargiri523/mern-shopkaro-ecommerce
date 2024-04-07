import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSeleted] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-all-category`);
      if (data.success) {
        setCategories(data.category);
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
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is updated`);
        setSeleted(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(`successfully deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout clName={"bg-info-subtle"} title={"Create Category"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2">
          <div className="col-md-4 pt-2 mt-2 bg-warning-subtle">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2 d-flex flex-column align-items-center ">
            <h3>Manage Category</h3>
            <div className="w-50">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div
              className="w-75 m-2"
              style={{
                background: "#b88ff6",
                border: "2px solid skyblue",
                borderRadius: "15px",
                padding: "1rem 1.5rem",
              }}
            >
              <table
                className="table table-info"
                style={{
                  background: "yellow",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid green" }}>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat) => (
                    <>
                      <tr style={{ borderBottom: "1px solid lightgreen" }}>
                        <td key={cat._id}>{cat.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdatedName(cat.name);
                              setSeleted(cat);
                            }}
                            className="editBtn ms-2"
                          >
                            Edit
                          </button>
                          <button
                            className="deleteBtn ms-2"
                            onClick={() => {
                              handleDelete(cat._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              visible={isModalOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleEdit}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
