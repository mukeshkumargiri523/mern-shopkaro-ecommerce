import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div
        className="text-center p-2"
        style={{
          background: "linear-gradient(to right, #556270, #ff6b6b)",
          minHeight: "30vh",
          borderRadius: "10px",
        }}
      >
        <div className="list-group">
          <h3
            style={{
              color: "peachpuff",
            }}
          >
            Admin Panel
          </h3>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/update-category"
            className="list-group-item list-group-item-action"
          >
            Update Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action "
          >
            List Of Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action "
          >
            List Of Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action "
          >
            List Of Users Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
