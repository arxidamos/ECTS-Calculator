import React, { useState } from 'react';
import './MainPage.css'
import checkmark from '/home/dimos/Desktop/ectsTool/ects-tool/src/checkmark.svg'
import closemark from '/home/dimos/Desktop/ectsTool/ects-tool/src/empty.svg';

const MainPage = () => {
  const [courses, setCourses] = useState([
    { course: "Εισαγωγή στον Προγραμματισμό Ι", ects: 5, grade: "" },
    { course: "Δομές Δεδομένων", ects: 10, grade: "" },
    { course: "Course 3", ects: 7, grade: "" },
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
            <tr className="course-row" key={index}>
              <td data-label="Course" className="course-cell" title={course.course}>
                
                
                {/* {course.course}
                {course.completed && <img className="checkmark-img" src={checkmark} alt="Completed" />} */}
  <div className="course-text-container">
    <div className="img-course">
    {course.completed ? <img className="checkmark-img" src={checkmark} alt="Completed" /> : <img className="checkmark-img" src={closemark} alt="Completed" />}
    </div>

                <div className="text-course">
                  {course.course}
                </div>
  </div>


              </td>
              
              <td data-label="ECTS" className="ects-cell">
                <input className="course-input" type="text" value={course.ects} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].ects = e.target.value;
                  setCourses(newCourses);}}/>
              </td>
              <td data-label="Grade" className="grade-cell">
                <input
                  className="course-input"
                  type="text"
                  value={course.grade ? course.grade : '-'}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      e.target.value = '-';
                    } 
                    const newCourses = [...courses];
                    newCourses[index].grade = e.target.value;

                    newCourses[index].completed = (e.target.value >= 5 && e.target.value <= 10) ? true : false;
                    setCourses(newCourses);}}
                    onFocus={(e) => {
                      e.target.value = '';}}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '-';
                      }
                    }}
                    />
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