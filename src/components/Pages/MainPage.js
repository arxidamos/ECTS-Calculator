import React, { useState } from 'react';
import './MainPage.css'

const MainPage = () => {
  const [courses, setCourses] = useState([
    { course: "Εισαγωγή στον Προγραμματισμό Ι", ects: 5, grade: "A" },
    { course: "Δομές Δεδομένων", ects: 10, grade: "B" },
    { course: "Course 3", ects: 7, grade: "C" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { course: "New course", ects: 0, grade: "" }])
  }

  return (
    <>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>ECTS</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td data-label="Course" className="course-cell">
                {course.course}
              </td>
              
              <td data-label="ECTS" className="ects-cell">
                <input type="text" value={course.ects} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].ects = e.target.value;
                  setCourses(newCourses);}}/>
              </td>
              <td data-label="Grade" className="grade-cell">
                <input type="text" value={course.grade} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].grade = e.target.value;
                  setCourses(newCourses);}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addCourse}>Add Row</button>
    </>
  );
}

export default MainPage;