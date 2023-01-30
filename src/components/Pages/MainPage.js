import React, { useState } from 'react';
import './MainPage.css'
import Search from '/home/dimos/Desktop/ectsTool/ects-tool/src/components/Search/Search';
import StudentInfo from '/home/dimos/Desktop/ectsTool/ects-tool/src/components/StudentInfo/StudentInfo'

import checkmark from '/home/dimos/Desktop/ectsTool/ects-tool/src/checkmark.svg'
import closemark from '/home/dimos/Desktop/ectsTool/ects-tool/src/empty.svg';

const sanitize = (string) => {
  return string
    .toLowerCase()
    .replace(/ά/g, "α")
    .replace(/έ/g, "ε")
    .replace(/ί/g, "ι")
    .replace(/ή/g, "η")
    .replace(/ό/g, "ο")
    .replace(/ώ/g, "ω")
    .replace(/ύ/g, "υ")
    .replace(/\s/g, "")
  ;
};

const getIndex = (courses, item) => {
  return courses.findIndex(course => course.course === item.course);
}

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
    { course: "Αριθμητική Ανάλυση", ects: 6, grade: "", type: "track-compulsory", semester:"5ο", neededFor: "s1" },
    { course: "Αρχιτεκτονική Υπολογιστών ΙΙ", ects: 6, grade: "", type: "track-compulsory", semester:"5ο", neededFor: "s4", specialization: "s3" },
    { course: "Δίκτυα Επικοινωνιών ΙΙ", ects: 6, grade: "", type: "track-compulsory", semester:"5ο", neededFor: "s5" },
    { course: "Υλοποίηση Συστημάτων Βάσεων Δεδομένων", ects: 6, grade: "", type: "track-compulsory", semester:"5ο", neededFor: "s2;s3" },
    { course: "Ψηφιακή Επεξεργασία Σήματος", ects: 6, grade: "", type: "track-compulsory", semester:"5ο", neededFor: "s6" },
    { course: "Διαχείριση Δικτύων", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s5" },
    { course: "Ηλεκτρονική", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s4" },
    { course: "Θεωρία Πληροφορίας και Κωδίκων", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "S6" },
    { course: "Θεωρία Υπολογισμού", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s2" },
    { course: "Μαθηματική Πληροφορικής", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s1" },
    { course: "Μεταγλωττιστές", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s3", specialization: "s4" },

    // Projects
    { course: "Ανάπτυξη Λογισμικού για Αλγοριθμικά Προβλήματα", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Λογισμικού για Πληροφοριακά Συστήματα", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Λογισμικού για Συστήματα Δικτύων και Τηλεπικοινωνιών", ects: 8, grade: "", type: "project", semester: "7ο" },
    { course: "Ανάπτυξη Υλικού - Λογισμικού για Ενσωματωμένα Συστήματα", ects: 8, grade: "", type: "project", semester: "8ο" },

    // General education courses
    { course: "Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες", ects: 2, grade: "", type: "general-edu", semester: "1ο" },
    { course: "Δομή και Θεσμοί της Ευρωπαϊκής Ένωσης", ects: 2, grade: "", type: "general-edu", semester: "7ο" },
    { course: "Διοίκηση Έργων και Τεχνικές Παρουσίασης και Συγγραφής Επιστημονικών Εκθέσεων", ects: 2, grade: "", type: "general-edu", semester: "8ο" },

    // Dissertation - internship
    { course: "Πτυχιακή / Πρακτική Ι", ects: 8, grade: "", type: "thesis", semester: "7ο" },
    { course: "Πτυχιακή / Πρακτική ΙΙ", ects: 8, grade: "", type: "thesis", semester: "8ο" },

    // Free electives
    { course: "Ελεύθερο Ι", ects: 4, grade: "", type: "free-elective", semester: "" },
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
    { course: "Ειδικά Θέματα Υπολογιστικών Συστημάτων και Εφαρμογών", ects: 4, grade: "", type: "elective-specialization", semester: "7ο;8ο", specialization: "" },
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

    { course: "Ασύρματες Ζεύξεις", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Ειδικά Θέματα Επικοινωνιών και Επεξεργασίας Σήματος: Γραμμές μεταφοράς, κυματοδηγοί και οπτικές ίνες", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Ειδικά Θέματα Θεωρητικής Πληροφορικής: Αλγόριθμοι Δομικής Βιοπληροφορικής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
    { course: "Ειδικά Θέματα Υπολογιστικών Συστημάτων και Εφαρμογών: Υπολογιστικά Συστήματα Μεγάλης Κλίμακας", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Επεξεργασία Εικόνας", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Επεξεργασία Ομιλίας και Φυσικής Γλώσσας", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s6" },
    { course: "Θεωρία Γραφημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s1" },
    { course: "Ιστορία της Πληροφορικής και των Τηλεπικοινωνιών", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Καινοτομία και Επιχειρηματικότητα", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Κρυπτογραφία", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s1" },
    { course: "Μικροοικονομική Ανάλυση", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Μουσική Πληροφορική", ects: 4, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Παράλληλοι Αλγόριθμοι", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Προστασία και Ασφάλεια Υπολογιστικών Συστημάτων", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s3" },
    { course: "Σημασιολογία Γλωσσών Προγραμματισμού", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s1;s2" },
    { course: "Σχολική Τάξη & Μικροδιδασκαλία", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "" },
    { course: "Τεχνολογία Λογισμικού", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s3" },
    { course: "Υπολογιστική Γεωμετρία", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s1" },
    { course: "Υπολογιστική Θεωρία Μηχανικης Μάθησης", ects: 6, grade: "", type: "elective-specialization", semester: "8ο", specialization: "s1" },
    { course: "Φωτονική", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },



  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [track, setTrack] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [highlight, setHighlight] = useState(false);

  const addCourse = () => {
    setCourses([...courses, { course: "New course", ects: 0, grade: "" }])
  }

  const handleHighlight = () => {
    setHighlight(!highlight);
  }

  const coursesByType = courses.reduce((groupedCourses, course) => {
    (groupedCourses[course.type] = groupedCourses[course.type] || []).push(course);
    return groupedCourses;
  }, {});

  const getLabelFromType = (type) => {
    switch (type) {
      case "compulsory":
        return 'Υποχρεωτικά'
      case "optional-lab":
        return "Αυτοτελή Προαιρετικά Εργαστήρια"
      case "track-compulsory":
        return "Κατ' επιλογή Υποχρεωτικά"
      case "project":
        return "Project"
      case "general-edu":
        return "Γενικής Παιδείας"
      case "thesis":
        return "Πτυχιακή Εργασία / Πρακτική Άσκηση"
      case "free-elective":
        return "Ελεύθερα"
      case "elective-specialization":
        return "Προαιρετικά"
    }
  }

  return (
    <>
      <StudentInfo track={track} setTrack={setTrack} specialization={specialization} setSpecialization={setSpecialization} />
      <label className="switch">
        <input type="checkbox" onChange={handleHighlight} />
        <span className="slider round"></span>
      </label>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table className="responsive-table">
        {
          Object.entries(coursesByType).map(([type, typeCourses]) => (
            <React.Fragment key={type}>
              {typeCourses
                .reduce((acc, course) => {
                  if (course.type === type) {
                    acc.push(course);
                  }
                  return acc;
                }, [])
                .filter(course =>
                  sanitize(course.course).includes(sanitize(searchTerm))
                ).length > 0 && (
                  <thead>
                    <tr>
                      <td>55% wide</td>
                      <td>25% wide</td>
                      <td>25% wide</td>
                    </tr>
                    <tr className="grouplabel">
                      <th colSpan="3" className="section-label">{getLabelFromType(type)}</th>
                    </tr>
                    <tr>
                      <th className="column-header column-header-course">Course</th>
                      <th className="column-header column-header-ects">ECTS</th>
                      <th className="column-header column-header-grade">Grade</th>
                    </tr>
                  </thead>
                )}
              <tbody id="section-compulsory" key={type}>
                {typeCourses
                  .reduce((acc, course) => {
                    if (course.type === type) {
                      acc.push(course);
                    }
                    return acc;
                  }, [])
                  .filter(course => sanitize(course.course)
                    .includes(sanitize(searchTerm)
                    ))
                  .map((course, index) => (
                    <tr className="course-row" key={courses.findIndex(item => item.course === course.course)}>
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
                          const currentIndex = getIndex(courses, course);
                          newCourses[currentIndex].ects = e.target.value;
                          setCourses(newCourses);
                        }} />
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
                            const currentIndex = getIndex(courses, course);
                            newCourses[currentIndex].grade = e.target.value;
                            newCourses[currentIndex].completed = (e.target.value >= 5 && e.target.value <= 10) ? true : false;
                            setCourses(newCourses);
                          }}
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
            </React.Fragment>
          ))}
      </table>
      <button onClick={addCourse}>Add Row</button>
    </>
  );
}

export default MainPage;