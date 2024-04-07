import React from "react";

function RatingForm({ handleSubmit, value, setValue }) {
  return (
    <>
      <form
        style={{
          background:
            "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
          border: "2px solid red",
          borderRadius: "15px",
          padding: "1rem 1.6rem",
        }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <input
            style={{ background: "skyblue" }}
            type="number"
            min="0"
            max="5"
            className="form-control"
            placeholder="Enter product rating"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{ margin: "-10px 0 10px 0" }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default RatingForm;
