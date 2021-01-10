import axios from 'axios';

export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subcategories`);
};

export const getSubCategory = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/subcategory/${_id}`);
};

export const createSubCategory = async (subcategory, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/subcategory`,
    subcategory,
    {
      headers: {
        authtoken
      }
    }
  );
};

export const updateSubCategory = async (_id, subcategory, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/subcategory/${_id}`,
    subcategory,
    {
      headers: {
        authtoken
      }
    }
  );
};

export const deleteSubCategory = async (_id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/subcategory/${_id}`, {
    headers: {
      authtoken
    }
  });
};
