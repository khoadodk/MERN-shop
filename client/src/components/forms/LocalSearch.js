import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div>
      <input
        type='search'
        placeholder='Search'
        value={keyword}
        onChange={handleSearch}
        className='form-control mb-5'
      />
    </div>
  );
};

export default LocalSearch;
