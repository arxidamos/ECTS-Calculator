import React, { useState } from 'react';
import './MainPage.css'
import Search from '/home/dimos/Desktop/ectsTool/ects-tool/src/components/Search/Search';

import checkmark from '/home/dimos/Desktop/ectsTool/ects-tool/src/checkmark.svg'
import closemark from '/home/dimos/Desktop/ectsTool/ects-tool/src/empty.svg';

const MainPage = () => {
  const [courses, setCourses] = useState([
    // Compulsory courses
    { course: "Γραμμική Άλγεβρα", ects: 6, grade: "", type: "compulsory", semester: "1ο" },
    { course: "Διακριτά Μαθηματικά", ects: 7, grade: "", type: "compulsory", semester: "1ο" },
    { course: "Εισαγωγή στον Προγραμματισμό Ι", ects: 7, grade: "", type: "compulsory", semester: "1ο" },
    { course: "Λογική Σχεδίαση", ects: 6, grade: "", type: "compulsory", semester: "1ο" },
    { course: "Ανάλυση Ι", ects: 8, grade: "", type: "compulsory", semester: "2ο" },
    { course: "Αρχιτεκτονική Υπολογιστών Ι", ects: 7, grade: "", type: "compulsory", semester: "2ο" },
    { course: "Δομές Δεδομένων και Τεχνικές Προγραμματισμού", ects: 7, grade: "", type: "compulsory", semester: "2ο" },
    { course: "Ηλεκτρομαγνητισμός, Οπτική, Σύγχρονη Φυσική", ects: 8, grade: "", type: "compulsory", semester: "2ο" },
    { course: "Ανάλυση ΙΙ", ects: 8, grade: "", type: "compulsory", semester: "3ο" },
    { course: "Αντικειμενοστραφής Προγραμματισμός", ects: 8, grade: "", type: "compulsory", semester: "3ο" },
    { course: "Πιθανότητες και Στατιστική", ects: 6, grade: "", type: "compulsory", semester: "3ο" },
    { course: "Σήματα και Συστήματα", ects: 6, grade: "", type: "compulsory", semester: "3ο" },
    { course: "Αλγόριθμοι και Πολυπλοκότητα", ects: 8, grade: "", type: "compulsory", semester: "4ο" },
    { course: "Δίκτυα Επικοινωνιών Ι", ects: 6, grade: "", type: "compulsory", semester: "4ο" },
    { course: "Συστήματα Επικοινωνιών", ects: 7, grade: "", type: "compulsory", semester: "4ο" },
    { course: "Σχεδίαση και Χρήση Βάσεων Δεδομένων", ects: 7, grade: "", type: "compulsory", semester: "4ο" },
    { course: "Λειτουργικά Συστήματα", ects: 8, grade: "", type: "compulsory", semester: "5ο" },
    { course: "Προγραμματισμός Συστήματος", ects: 8, grade: "", type: "compulsory", semester: "6ο" },

    // Optional laboratory courses
    { course: "Εργαστήριο Λογικής Σχεδίασης", ects: 2, grade: "", type: "optional-lab", semester:"1ο" },
    { course: "Εργαστήριο Κυκλωμάτων και Συστημάτων", ects: 2, grade: "", type: "optional-lab", semester:"3ο" },
    { course: "Εργαστήριο Δικτύων Επικοινωνιών Ι", ects: 2, grade: "", type: "optional-lab", semester:"4ο" },

    // Track compulsory courses
    { course: "Αριθμητική Ανάλυση", ects: 6, grade: "", type: "track-compulsory", semester:"5ο" },
    { course: "Αρχιτεκτονική Υπολογιστών ΙΙ", ects: 6, grade: "", type: "track-compulsory", semester:"5ο" },
    { course: "Δίκτυα Επικοινωνιών ΙΙ", ects: 6, grade: "", type: "track-compulsory", semester:"5ο" },
    { course: "Υλοποίηση Συστημάτων Βάσεων Δεδομένων", ects: 6, grade: "", type: "track-compulsory", semester:"5ο" },
    { course: "Ψηφιακή Επεξεργασία Σήματος", ects: 6, grade: "", type: "track-compulsory", semester:"5ο" },
    { course: "Διαχείριση Δικτύων", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },
    { course: "Ηλεκτρονική", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },
    { course: "Θεωρία Πληροφορίας και Κωδίκων", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },
    { course: "Θεωρία Υπολογισμού", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },
    { course: "Μαθηματική Πληροφορικής", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },
    { course: "Μεταγλωττιστές", ects: 6, grade: "", type: "track-compulsory", semester:"6ο" },

    // Projects
    { course: "Ανάπτυξη Λογισμικού για Αλγοριθμικά Προβλήματα", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Λογισμικού για Πληροφοριακά Συστήματα", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Λογισμικού για Συστήματα Δικτύων και Τηλεπικοινωνιών", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Υλικού - Λογισμικού για Ενσωματωμένα Συστήματα", ects: 8, grade: "", type: "project", semester: "8ο" },

    // General education courses
    { course: "Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες", ects: 2, grade: "", type: "general-edu", semester: "1ο" },
    { course: "Δομοί και Θεσμοί της Ευρωπαϊκής Ένωσης", ects: 2, grade: "", type: "general-edu", semester: "7ο" },
    { course: "Διοίκηση Έργων και Τεχνικές Παρουσίασης και Συγγραφής Επιστημονικών Εκθέσεων", ects: 2, grade: "", type: "general-edu", semester: "8ο" },

    // Dissertation - internship
    { course: "Πτυχιακή / Πρακτική Ι", ects: 8, grade: "", type: "thesis", semester: "7ο" },
    { course: "Πτυχιακή / Πρακτική ΙΙ", ects: 8, grade: "", type: "thesis", semester: "8ο" },

    // Free electives
    { course: "Ελεύθερο ΙΙ", ects: 4, grade: "", type: "free-elective", semester: "" },
    { course: "Ελεύθερο ΙΙ", ects: 4, grade: "", type: "free-elective", semester: "" },

    // Elective specialization courses
    { course: "Εφαρμοσμένα Μαθηματικά", ects: 6, grade: "", type: "elective-specialization", semester: "2ο", specialization: "s6" },
    { course: "Αρχές Γλωσσών Προγραμματισμού", ects: 6, grade: "", type: "elective-specialization", semester: "5o", specialization: "s1;s2" },
    { course: "Γραφικά Ι", ects: 6, grade: "", type: "elective-specialization", semester: "5o", specialization: "s1;s6" },
    { course: "Κύματα, Κυματοδηγοί, Κεραίες", ects: 6, grade: "", type: "elective-specialization", semester: "5ο", specialization: "s5" },
    { course: "Παράλληλα Συστήματα", ects: 6, grade: "", type: "elective-specialization", semester: "5ο", specialization: "" },
    { course: "Σχεδίαση Ψηφιακών Συστημάτων - VHDL", ects: 6, grade: "", type: "elective-specialization", semester: "5ο", specialization: "s4" },
    { course: "Τεχνητή Νοημοσύνη", ects: 6, grade: "", type: "elective-specialization", semester: "5o", specialization: "s2;s3" },
    { course: "Τηλεπικοινωνιακά Δίκτυα", ects: 6, grade: "", type: "elective-specialization", semester: "5o", specialization: "s5" },
    { course: "Αλγόριθμοι - Θεμελιώσεις Μηχανικής Μάθησης", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s1;s2" },
    { course: "Αναγνώριση Προτύπων - Μηχανική Μάθηση", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s2;s6" },
    { course: "Ανάλυση/Σχεδίαση Συστημάτων Λογισμικού", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s3" },
    { course: "Ασύρματα Δίκτυα Αισθητήρων", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s4;s5" },
    { course: "Ειδικά Θέματα Επικοινωνιών και Επεξεργασίας Σήματος – Πολυμέσα και Ασύρματη Δικτύωση", ects: 4, grade: "", type: "elective-specialization", semester: "6ο", specialization: "" },
    { course: "Επεξεργασία Στοχαστικών Σημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s5;s6" },
    { course: "Επιστημονικοί Υπολογισμοί", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s1" },
    { course: "Εργαστήριο Ηλεκτρονικής", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s4" },
    { course: "Λογικός Προγραμματισμός", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s2" },
    { course: "Τεχνικές Εξόρυξης Δεδομένων", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s2" },
    { course: "Τεχνολογίες Εφαρμογών Διαδικτύου", ects: 6, grade: "", type: "elective-specialization", semester: "6ο", specialization: "s3;s5" },
    
    { course: "Αλγοριθμική Επιχειρησιακή Έρευνα", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1;s2;s6" },
    { course: "Διδακτική τής Πληροφορικής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Επικοινωνιών και Επεξεργασίας Σήματος: Ειδικά Θέματα Κβαντικής Πληροφορίας και Υπολογιστικής", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Υπολογιστικών Συστημάτων και Εφαρμογών", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ενισχυτική Μηχανική Μάθηση και Στοχαστικά Παίγνια", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Επικοινωνία Ανθρώπου Μηχανής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s2;s3" },
    { course: "Ηλεκτρονική Διακυβέρνηση", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Θεωρία Αριθμών", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Οπτικές Επικοινωνίες και Οπτικά Δίκτυα", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s4;s5" },
    { course: "Πληροφοριακά Συστήματα", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Προηγμένα Θέματα Αλγορίθμων", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Προηγμένοι Επιστημονικοί Υπολογισμοί", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Συστήματα Κινητών και Προσωπικών Επικοινωνιών", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s5" },
    { course: "Συστήματα Ψηφιακής Επεξεργασίας Σημάτων σε Πραγματικό Χρόνο", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s4;s6;s6" },
    { course: "Σχεδίαση VLSI Κυκλωμάτων", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s4" },
    { course: "Τεχνητή Νοημοσύνη ΙΙ (Βαθιά Μηχανική Μάθηση για την Επεξεργασία Φυσικής Γλώσσας)", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s2;s3" },
    { course: "Τεχνολογίες της Πληροφορίας και των Επικοινωνιών (ΤΠΕ) στη Μάθηση", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Υπολογιστική Πολυπλοκότητα", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Ψηφιακές Επικοινωνίες", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s5" },
    { course: "Ψηφιακή Προσβασιμότητα και Υποστηρικτικές Τεχνολογίες Πληροφορικής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },

    { course: "Ασύρματες Ζεύξεις", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Επικοινωνιών και Επεξεργασίας Σήματος: Γραμμές μεταφοράς, κυματοδηγοί και οπτικές ίνες", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Θεωρητικής Πληροφορικής: Αλγόριθμοι Δομικής Βιοπληροφορικής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Υπολγιστικών Συστημάτων και Εφαρμογών: Υπολογιστικά Συστήματα Μεγάλης Κλίμακας", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Υπολογιστικών Συστημάτων και Εφαρμογών", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Επεξεργασία Εικόνας", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Επεξεργασία Ομιλίας και Φυσικής Γλώσσας", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s6" },
    { course: "Επεξεργασία Στοχαστικών Σημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s5;s6" },
    { course: "Θεωρία Γραφημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Ιστορία της Πληροφορικής και των Τηλεπικοινωνιών", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Καινοτομία και Επιχειρηματικότητα", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Κρυπτογραφία", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Μικροοικονομική Ανάλυση", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Μουσική Πληροφορική", ects: 4, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Παράλληλοι Αλγόριθμοι", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Προστασία και Ασφάλεια Υπολογιστικών Συστημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s3" },
    { course: "Σημασιολογία Γλωσσών Προγραμματισμού", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1;s2" },
    { course: "Σχολική Τάξη & Μικροδιδασκαλία", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Τεχνολογία Λογισμικού", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s3" },
    { course: "Υπολογιστική Γεωμετρία", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Υπολογιστική Θεωρία Μηχανικης Μάθησης", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "s1" },
    { course: "Φωτονική", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },



  ]);

  const addCourse = () => {
    setCourses([...courses, { course: "New course", ects: 0, grade: "" }])
  }

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table className="responsive-table">
        <thead>
          <tr>
            <td>55% wide</td>
            <td>25% wide</td>
            <td>25% wide</td>
          </tr>
          <tr className="grouplabel"><th colSpan="3" className="section-label">Υποχρεωτικά</th></tr>
          <tr>
            <th className="column-header column-header-course">Course</th>
            <th className="column-header column-header-ects">ECTS</th>
            <th className="column-header column-header-grade">Grade</th>

          </tr>
        </thead>
        <tbody id="section-compulsory">
          {courses
          .filter(course => course.type === "compulsory")
          .filter(course => course.course.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((course, index) => (
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
        
        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label">Αυτοτελή Προαιρετικά Εργαστήρια</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "optional-lab")
          .map((course, index) => (
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

        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label">Project</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "project")
          .map((course, index) => (
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

        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label">Γενικής Παιδείας</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "general-edu")
          .map((course, index) => (
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

        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label">Πτυχιακή Εργασία / Πρακτική Άσκηση</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "thesis")
          .map((course, index) => (
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

        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label" title="Αν δηλώσατε 2 ειδικεύσεις διαφορετικών κατευθύνσεων, τα ελεύθερα δεν μπορούν να μετρήσουν στο πτυχίο.&#13;Στις υπόλοιπες περιπτώσεις, τα ελεύθερα μπορούν να μετρήσουν μέχρι το πολύ 8 ECTS">Ελέυθερα &#x2a;</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "free-elective")
          .map((course, index) => (
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


        <thead>
          <tr className="grouplabel"><th colSpan="3" className="section-label" title="Πρέπει να πάρετε 4 βασικά μαθήματα για να κατοχυρώσετε μια ειδίκευση.&#13;Αν δεν έχετε ειδίκευση, πρέπει να πάρετε 4 μαθήματα από τα βασικά οποιασδήποτε ειδίκευσης εκ των τριών της κατεύθυνσής σας.">Προαιρετικά Μαθήματα &#x2a;</th></tr>
          <tr>
            <th className="column-header">Course</th>
            <th className="column-header">ECTS</th>
            <th className="column-header">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses
          .filter(course => course.type === "elective-specialization")
          .map((course, index) => (
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