import React from 'react';

const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-control'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <button
        type='submit'
        className='btn btn-raised mt-3 float-right'
        disabled={name.length < 3}>
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
