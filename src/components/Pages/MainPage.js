import React, { useState } from "react";

const MainPage = () => {
  const [courses, setCourses] = useState([
    { course: "Course 1", ects: 5, grade: "A" },
    { course: "Course 2", ects: 10, grade: "B" },
    { course: "Course 3", ects: 7, grade: "C" },
  ]);

  const addCourse = () => {
    setCourses([...courses, {course:"New course", ects:0, grade:""}])
  }

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>ECTS Units</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{course.course}</td>
            <td>
              <input type="text" value={course.ects} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].ects = e.target.value;
                  setCourses(newCourses);
                }}
              />
            </td>
            <td>
              <input type="text" value={course.grade} onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].grade = e.target.value;
                  setCourses(newCourses);
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