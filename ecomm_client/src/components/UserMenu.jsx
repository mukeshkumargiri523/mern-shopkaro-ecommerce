import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div
        className="text-center p-2"
        style={{
          background: "linear-gradient(to right, #83a4d4, #b6fbff)",
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
            User Panel
          </h3>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
