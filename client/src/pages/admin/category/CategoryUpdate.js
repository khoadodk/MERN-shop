import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Checkbox } from "antd";

import AdminNav from "../../../components/navbar/AdminNav";
import Loading from "../../../components/loading/Loading";
import { getCategory, updateCategory } from "../../../functions/category";
import { getSubCategories } from "../../../functions/subcategory";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
    loadSubCategories();
    // eslint-disable-next-line
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug).then((c) => {
      setName(c.data.category.name);
      setSelectedSubs(c.data.category.subs);
    });
  };

  const loadSubCategories = () => {
    getSubCategories().then((s) => setSubs(s.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(
      match.params.slug,
      { name, subIds: selectedSubs },
      user.token
    )
      .then(() => {
        setLoading(false);
        toast.success(`Category of ${name} updated!`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to update ${name} category!`);
        }
      });
  };

  const handleChange = (e) => {
    let inTheState = [...selectedSubs];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setSelectedSubs(inTheState);
  };

  const handleCheck = (s) =>
    selectedSubs.find((selectedSub) => selectedSub === s._id);

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
              <h4>Update Category</h4>

              <div className="py-2">
                Subcategories:
                <span className="ml-2">
                  {subs.length &&
                    subs.map((s) => (
                      <Checkbox
                        value={s._id}
                        key={s._id}
                        checked={handleCheck(s)}
                        onChange={handleChange}
                      >
                        {s.name}
                      </Checkbox>
                    ))}
                </span>
              </div>

              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
