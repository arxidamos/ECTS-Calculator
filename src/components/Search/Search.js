import React from 'react';
import './Search.css'

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Αναζήτηση μαθήματος..."
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;