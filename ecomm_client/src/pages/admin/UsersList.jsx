import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/Loader";

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  //get list of all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/auth/get-all-users`);
      setLoading(false);
      if (data?.success) {
        setUsersList(data.users);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout clName={"bg-info-subtle"} title={"Users"}>
      <div className="container-fluid my-2 py-2 text-center">
        <div className="row m-2">
          <div className="col-md-4 pt-2 bg-warning-subtle mt-2">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-2">
            <h3>All Users List</h3>

            {!loading ? (
              <>
                {usersList?.length !== 0 ? (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th
                            style={{
                              borderLeft: "1px solid green",
                              borderBottom: "1px solid red",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              borderLeft: "1px solid green",
                              borderBottom: "1px solid red",
                            }}
                          >
                            Name
                          </th>
                          <th
                            style={{
                              borderLeft: "1px solid green",
                              borderBottom: "1px solid red",
                            }}
                          >
                            Email
                          </th>
                          <th
                            style={{
                              borderLeft: "1px solid green",
                              borderBottom: "1px solid red",
                            }}
                          >
                            Phone No
                          </th>
                          <th
                            style={{
                              borderLeft: "1px solid green",
                              borderBottom: "1px solid red",
                            }}
                          >
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList?.map((usr, i) => (
                          <tr
                            key={i}
                            style={{
                              backgroundColor: "#ffc5cd",
                            }}
                          >
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {usr?.name}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {usr?.email}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {usr?.phone}
                            </td>
                            <td
                              style={{
                                backgroundColor: "#ffc5cd",
                                borderLeft: "1px solid blue",
                              }}
                            >
                              {usr?.address}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <h3>No Users Registered</h3>
                )}
              </>
            ) : (
              <div className="d-flex justify-content-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UsersList;
