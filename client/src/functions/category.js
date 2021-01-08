import axios from 'axios';

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const createCategory = async (name, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/category`, name, {
    headers: {
      authtoken
    }
  });
};

export const updateCategory = async (slug, newName, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    newName,
    {
      headers: {
        authtoken
      }
    }
  );
};

export const deleteCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken
    }
  });
};
