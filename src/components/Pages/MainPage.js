import React, { useState } from 'react';
import './MainPage.css'
import checkmark from '/home/dimos/Desktop/ectsTool/ects-tool/src/checkmark.svg'
import closemark from '/home/dimos/Desktop/ectsTool/ects-tool/src/empty.svg';

const MainPage = () => {
  const [courses, setCourses] = useState([
    { course: "Γραμμική Άλγεβρα", ects: 6, grade: "" },
    { course: "Διακριτά Μαθηματικά", ects: 7, grade: "" },
    { course: "Εισαγωγή στον Προγραμματισμό Ι", ects: 7, grade: "" },
    { course: "Λογική Σχεδίαση", ects: 6, grade: "" },
    { course: "Ανάλυση Ι", ects: 8, grade: "" },
    { course: "Ηλεκτρομαγνητισμός, Οπτική, Σύγχρονη Φυσική", ects: 8, grade: "" },
    { course: "Δομές Δεδομένων και Τεχνικές Προγραμματισμού", ects: 7, grade: "" },
    { course: "Αρχιτεκτονική Υπολογιστών Ι", ects: 7, grade: "" },
    { course: "Ανάλυση ΙΙ", ects: 8, grade: "" },
    { course: "Πιθανότητες και Στατιστική", ects: 8, grade: "" },
    { course: "Αντικειμενοστραφής Προγραμματισμός", ects: 8, grade: "" },
    { course: "Σήματα και Συστήματα", ects: 6, grade: "" },
    { course: "Αλγόριθμοι και Πολυπλοκότητα", ects: 8, grade: "" },
    { course: "Σχεδίαση και Χρήση Βάσεων Δεδομένων", ects: 7, grade: "" },
    { course: "Δίκτυα Επικοινωνιών", ects: 6, grade: "" },
    { course: "Λειτουργικά Συστήματα", ects: 6, grade: "" },
    { course: "Προγραμματισμός Συστήματος", ects: 8, grade: "" },


  ]);

  const addCourse = () => {
    setCourses([...courses, { course: "New course", ects: 0, grade: "" }])
  }

  return (
    <>
      <table className="responsive-table">
        <thead>
        <tr className="grouplabel"><th colSpan="3" className="section-label">Compulsory</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody id="section-compulsory">
          {courses.map((course, index) => (
            <tr className="course-row" key={index}>
              <td data-label="" className="course-cell" title={course.course}>
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
                    onFocus={(e) => {
                      if (e.target.value === '-') {
                        e.target.value = '';
                      }
                    }}
                    defaultValue={course.grade ? course.grade : '-'}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '-';
                      }
                      const newCourses = [...courses];
                      newCourses[index].grade = e.target.value;
                      newCourses[index].completed = (e.target.value >= 5 && e.target.value <= 10) ? true : false;
                      setCourses(newCourses);}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                    />
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {courses.map((course, index) => (
            <tr className="course-row" key={index}>
              <td data-label="" className="course-cell" title={course.course}>
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
                    onFocus={(e) => {
                      if (e.target.value === '-') {
                        e.target.value = '';
                      }
                    }}
                    defaultValue={course.grade ? course.grade : '-'}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '-';
                      }
                      const newCourses = [...courses];
                      newCourses[index].grade = e.target.value;
                      newCourses[index].completed = (e.target.value >= 5 && e.target.value <= 10) ? true : false;
                      setCourses(newCourses);}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
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