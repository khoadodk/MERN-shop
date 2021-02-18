import React, { useState, useEffect } from "react";
import { Select } from "antd";

import { getCategorySubs, getCategories } from "../../functions/category";
import FileUpload from "../../components/forms/FileUpload";

const ProductForm = ({ values, setValues, handleChange, handleSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [showSubCat, setShowSubCat] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleCategoryChange = async (e) => {
    setShowSubCat(true);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubCat(res.data);
    });
  };

  const {
    title,
    description,
    price,
    quantity,
    subs,
    shipping,
    category,
  } = values;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Description"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <input
        type="number"
        className="form-control"
        placeholder="Price"
        name="price"
        value={price}
        onChange={handleChange}
      />
      <input
        type="number"
        className="form-control"
        placeholder="Quanity"
        name="quantity"
        value={quantity}
        onChange={handleChange}
      />
      <select
        name="shipping"
        className="form-control"
        onChange={handleChange}
        value={shipping === "yes" ? "yes" : "no"}
      >
        <option value="" disabled>
          Select Shipping
        </option>
        <option value="no">No Free Shipping</option>
        <option value="yes">Free Shipping</option>
      </select>
      <select
        name="category"
        className="form-control"
        value={category ? category : ""}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {showSubCat && subCat && (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select Subcategory"
          value={subs}
          name="subs"
          onChange={(value) => setValues({ ...values, subs: value })}
        >
          {subCat.length &&
            subCat.map((s) => (
              <Select.Option key={s._id} value={s._id}>
                {s.name}
              </Select.Option>
            ))}
        </Select>
      )}

      <FileUpload values={values} setValues={setValues} />

      <button type="submit" className="btn btn-raised mt-3 float-right">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
