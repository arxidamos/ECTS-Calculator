import React from 'react';
import './Search.css'
import searchIcon from '../../search.svg';

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="search-form">
      <img className="seach-icon" src={searchIcon} alt="Search Icon" />
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