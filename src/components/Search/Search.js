import React, { useState } from 'react';
import './Search.css'

const Search = ({ searchTerm, setSearchTerm }) => {
  //   const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // filter the courses based on the search term
  //     const filteredCourses = courses.filter((course) =>
  //       course.course.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     // update the state with the filtered courses
  //     setCourses(filteredCourses);
  //   };

  return (
    // <form onSubmit={handleSubmit}>
    <form>
      <input
        type="text"
        placeholder="Search for a course"
        value={searchTerm}
        onChange={handleChange}
      />
      {/* <button type="submit">Search</button> */}
    </form>
  );
};

export default Search;