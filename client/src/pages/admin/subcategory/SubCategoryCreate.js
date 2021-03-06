import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Divider, List } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/navbar/AdminNav";
import Loading from "../../../components/loading/Loading";

import {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
} from "../../../functions/subcategory";

import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubCategories();
  }, []);

  const loadSubCategories = () => {
    getSubCategories().then((c) => setSubCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSubCategory({ name }, user.token)
      .then(() => {
        setLoading(false);
        setName("");
        toast.success(`SubCategory of ${name} created!`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        setName("");
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to create ${name} subcategory!`);
        }
      });
  };

  const handleDelete = async (_id) => {
    if (window?.confirm("Delete?")) {
      setLoading(true);
      await deleteSubCategory(_id, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(
            `SubCategory of ${res.data.name} deleted successfully!`
          );
          loadSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          } else {
            toast.error(`Fail to delete the subcategory!`);
          }
        });
    }
  };

  const filteredSubCategories = subcategories?.filter((sub) =>
    sub.name.includes(keyword)
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-6">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <h4>Create SubCategory</h4>

              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />

              <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              <Divider>List of SubCategories</Divider>
              <List
                bordered
                dataSource={keyword ? filteredSubCategories : subcategories}
                renderItem={(sub) => (
                  <List.Item key={sub._id}>
                    {sub.name}
                    <div className="float-right">
                      <span onClick={() => handleDelete(sub._id)}>
                        <DeleteOutlined className="btn btn-sm text-danger" />
                      </span>
                      <Link to={`/admin/subcategory/${sub._id}`}>
                        <EditOutlined className="btn btn-sm" />
                      </Link>
                    </div>
                  </List.Item>
                )}
              ></List>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
