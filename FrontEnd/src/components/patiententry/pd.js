import React from "react";

export default ({ handleChange, handleSubmit, post }) => {
  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <input
            className="col-12 form-control"
            name="name"
            onChange={handleChange}
            type="text"
            value={post.name}
            placeholder="post name"
          />
        </div>
        <div className="form-group">
          <textarea
            className="col-12 form-control"
            name="description"
            onChange={handleChange}
            type="text"
            value={post.description}
            placeholder="post description"
          />
        </div>
        <div className="form-group">
          <input
            className="col-12 form-control"
            name="salary"
            onChange={handleChange}
            type="number"
            value={post.salary}
            placeholder="post salary"
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={handleChange}
            name="level"
            value={post.level}
          >
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
            <option>Any</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
