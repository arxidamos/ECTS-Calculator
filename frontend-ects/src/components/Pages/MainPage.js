import React, { useState, useEffect } from 'react';
import './MainPage.css'
import Search from '../Search/Search'
import StudentInfo from '../StudentInfo/StudentInfo'
import AddCourseModal from '../AddCourseModal/AddCourseModal'
import FloatingButton from '../FloatingButton/FloatingButton';

import checkmark from '../../checkmark.svg'
import closemark from '../../empty.svg';

const TRACK_A_SPECIALIZATIONS = ["s1", "s2", "s3"];
const TRACK_B_SPECIALIZATIONS = ["s4", "s5", "s6"];
const MAX_ELECTIVE_FOR_TRACK = 4;
const MAX_ELECTIVE_FOR_TWO_SPECS = 8;
const MIN_PASSABLE_GRADE = 5;
const MAX_PASSABLE_GRADE = 10;
const GRADE_STYLE_NUMBERS = /^([0-9]|10)([,.]\d{1,2})?$/

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

const calculateAverageAux = (filteredCourses) =>
  filteredCourses.reduce((accum, { grade, ects }) => {
  if (grade) {
    if (grade === '-') {
      grade = 0
    }
    
    if (grade >= MIN_PASSABLE_GRADE && grade <= MAX_PASSABLE_GRADE) {
      ects = ects === '-' ? 0 : ects;
      accum.sum += parseFloat(grade) * parseInt(ects, MAX_PASSABLE_GRADE);
      accum.totalEcts += parseInt(ects, MAX_PASSABLE_GRADE);
    }
  }
  return accum;
}, { sum: 0, totalEcts: 0});

const filterTrackCompCourses = (courses, track, specialization, extraSpecialization) => {
  let trackCourses = []
  let specializationCourses = [];
  let extraSpecializationCourses = [];

  // Add courses available for this Track (bar those necessary for the Specialization)
  if (track === "A") {
    trackCourses = courses.filter(course =>
      (course.neededFor.includes("s1") || course.neededFor.includes("s2") || course.neededFor.includes("s3"))
      &&
      (!course.neededFor.includes(`s${specialization}`))
      &&
      (!course.neededFor.includes(`s${extraSpecialization}`))
    );
  }
  else if (track === "B") {
    trackCourses = courses.filter(course =>
      (course.neededFor.includes("s4") || course.neededFor.includes("s5") || course.neededFor.includes("s6"))
      &&
      (!course.neededFor.includes(`s${specialization}`))
      &&
      (!course.neededFor.includes(`s${extraSpecialization}`))
    );
  }

  if (specialization !== "7") {
    specializationCourses = courses.filter(course =>
      course.neededFor.includes(`s${specialization}`)
    );

    extraSpecializationCourses = courses.filter(course =>
      course.neededFor.includes(`s${extraSpecialization}`) && !course.neededFor.includes(`s${specialization}`)
    );
  }

  // If 4 different courses are needed for spec1, spec2,
  // no track compulsory can be taken by the student
  if ((specializationCourses.length + extraSpecializationCourses.length) === 4) {
    trackCourses = [];
  }
  return {
    trackCompTotal: trackCourses,
    specializationTotal: specializationCourses,
    extraSpecializationTotal : extraSpecializationCourses
  }
};
 
const getNumberOfPassedElective = (courses, track, specialization, extraSpecialization) => {
  let electiveCourses = [];
  let electiveCoursesPassed= [];
  let specPassed = [];
  let extraSpecPassed = [];
  let bothSpecsPassed = [];
  let totalPassedLength = 0;

  // Add courses available as 'basic' for this Track's Specializations
  if (track === "A") {
    electiveCourses = courses.filter(course =>
      course.specialization.includes("s1") || course.specialization.includes("s2") || course.specialization.includes("s3")
    );
  }
  else if (track === "B") {
    electiveCourses = courses.filter(course =>
      course.specialization.includes("s4") || course.specialization.includes("s5") || course.specialization.includes("s6")
    );
  }

  electiveCoursesPassed= electiveCourses.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

  // No Specs, just count whatever 4 basics of this Track
  if (specialization === '7') {
    return electiveCourses.length;
  }
  // Chosen Spec, not Extra Spec, count 4 basics of this Spec
  else if (extraSpecialization === '7') {
    return (electiveCoursesPassed.filter(course => 
      course.specialization.includes(`s${specialization}`)
    )).length;
  }
  // Chosen Spec and Extra Spec
  else {
    specPassed = electiveCoursesPassed.filter(course => (
      course.specialization.includes(`s${specialization}`)
      &&
      !course.specialization.includes(`s${extraSpecialization}`)
      )
    )

    extraSpecPassed = electiveCoursesPassed.filter(course => (
      course.specialization.includes(`s${extraSpecialization}`)
      &&
      !course.specialization.includes(`s${specialization}`)
      )
    )

    bothSpecsPassed = electiveCoursesPassed.filter(course => (
      course.specialization.includes(`s${specialization}`)
      &&
      course.specialization.includes(`s${extraSpecialization}`)
      )
    )
 
    if (specPassed.length >= 4) {
      totalPassedLength += 4;
    }
    else if (specPassed.length < 4) {
      totalPassedLength += specPassed.length;
    }

    if (extraSpecPassed.length >= 4) {
      totalPassedLength += 4;
    }
    else if (extraSpecPassed.length < 4) {
      totalPassedLength += extraSpecPassed.length;
    }

    if (totalPassedLength >= MAX_ELECTIVE_FOR_TWO_SPECS) {
      return MAX_ELECTIVE_FOR_TWO_SPECS;
    }
    else {
      return Math.min( totalPassedLength + bothSpecsPassed.length, MAX_ELECTIVE_FOR_TWO_SPECS)
    }
  }
};

const InfoTip = ({ text }) => (
  <span className="info-tip-span">
    &#42; {text}
  </span>
);

const MainPage = ({ coursesData, setCoursesData, programData, setProgramData }) => {
  // Get courses from localStorage, otherwise use inital courses array
  const [courses, setCourses] = useState(
    !localStorage.getItem('courses')
      ? [
        // Compulsory courses
        { course: "Γραμμική Άλγεβρα", ects: 6, grade: "", type: "compulsory", semester: "1ο" },
        { course: "Διακριτά Μαθηματικά", ects: 7, grade: "", type: "compulsory", semester: "1ο" },
        { course: "Εισαγωγή στον Προγραμματισμό", ects: 7, grade: "", type: "compulsory", semester: "1ο" },
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
        { course: "Θεωρία Πληροφορίας και Κωδίκων", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s6" },
        { course: "Θεωρία Υπολογισμού", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s2" },
        { course: "Μαθηματικά Πληροφορικής", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s1" },
        { course: "Μεταγλωττιστές", ects: 6, grade: "", type: "track-compulsory", semester:"6ο", neededFor: "s3", specialization: "s4" },

        // Projects
        { course: "Ανάπτυξη Λογισμικού για Αλγοριθμικά Προβλήματα", ects: 8, grade: "", type: "project", semester: "7ο", projectFor: "A" },
        { course: "Ανάπτυξη Λογισμικού για Πληροφοριακά Συστήματα", ects: 8, grade: "", type: "project", semester: "7ο", projectFor: "A" },
        { course: "Ανάπτυξη Λογισμικού για Συστήματα Δικτύων και Τηλεπικοινωνιών", ects: 8, grade: "", type: "project", semester: "7ο", projectFor: "B" },
        { course: "Ανάπτυξη Υλικού - Λογισμικού για Ενσωματωμένα Συστήματα", ects: 8, grade: "", type: "project", semester: "8ο", projectFor: "B" },

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
        { course: "Διδακτική της Πληροφορικής", ects: 6, grade: "", type: "elective-specialization", semester: "7ο", specialization: "" },
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
      ]
      : JSON.parse(localStorage.getItem('courses'))
  );

  const [showModal, setShowModal] = useState(false);

  const addNewCourse = (userCourse) => {
    setCourses([...courses, userCourse]);
    setCoursesData([...courses, userCourse]);
  };

  const handleAddCourse = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  const [specAndExtraSpecTotal, setSpecAndExtraSpecTotal] = useState(
    !localStorage.getItem('specAndExtraSpecTotal')
      ? 0
      : JSON.parse(localStorage.getItem('specAndExtraSpecTotal'))
  );

  const [searchTerm, setSearchTerm] = useState("");
  
  const [track, setTrack] = useState(
    !localStorage.getItem('track')
      ? "A"
      : JSON.parse(localStorage.getItem('track'))
  );

  const [specialization, setSpecialization] = useState(
    !localStorage.getItem('specialization')
      ? '7'
      : JSON.parse(localStorage.getItem('specialization'))
  );

  const [extraSpecialization, setExtraSpecialization] = useState(
    !localStorage.getItem('extraSpecialization')
      ? '7'
      : JSON.parse(localStorage.getItem('extraSpecialization'))
  );

  const [highlight, setHighlight] = useState(
    !localStorage.getItem('highlight')
      ? false
      : JSON.parse(localStorage.getItem('highlight'))
  );

  const [ectsAverage, setEctsAverage] = useState(
    !localStorage.getItem('average')
      ? ""
      : JSON.parse(localStorage.getItem('average'))
  );

  const [coursesByType, setCoursesByType] = useState({});

  // Add to courses on display, based on course type, any new courses
  useEffect( ()=> {
    const coursesByType = courses.reduce((groupedCourses, course) => {
      (groupedCourses[course.type] = groupedCourses[course.type] || []).push(course);
      return groupedCourses;
    }, {});
    setCoursesByType(coursesByType);
    console.log(coursesData[3]);
  }, [courses]);

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

  // Each time track, specialization, extra specialization change, update programData
  useEffect( () => {
    setProgramData({
      track: track,
      spec: specialization,
      extraSpec: extraSpecialization
    });
    console.log(`program data inside mainPage:`, programData);
  }, [track, specialization, extraSpecialization])

  // Each time component refreshes, retrieve from localStorage
  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
      setCoursesData(JSON.parse(storedCourses));
    }

    const storedTrack = localStorage.getItem('track');
    if (storedTrack) {
      setTrack(JSON.parse(storedTrack));
      setProgramData( (prevState) => ({
        ...prevState,
        track: JSON.parse(storedTrack),
      }));
    }

    const storedSpecAndExtraSpecTotal  = localStorage.getItem('specAndExtraSpecTotal');
    if (specAndExtraSpecTotal) {
      setSpecAndExtraSpecTotal(JSON.parse(storedSpecAndExtraSpecTotal));
    }

    const storedSpecialization = localStorage.getItem('specialization');
    if (storedSpecialization) {
      setSpecialization(JSON.parse(storedSpecialization));
      setProgramData( (prevState) => ({
        ...prevState,
        spec: JSON.parse(storedSpecialization),
      }));
    }

    const storedExtraSpecialization = localStorage.getItem('extraSpecialization');
    if (storedExtraSpecialization) {
      setExtraSpecialization(JSON.parse(storedExtraSpecialization));
      setProgramData( (prevState) => ({
        ...prevState,
        extraSpec: JSON.parse(storedExtraSpecialization),
      }));
    }

    const storedHighlight = localStorage.getItem('highlight');
    if (storedHighlight) {
      setHighlight(JSON.parse(storedHighlight));
    }

    const storedAverage = localStorage.getItem('average');
    if (storedAverage) {
      setEctsAverage(JSON.parse(storedAverage));
    }
  }, [])

  // Each time sth in courses is changed, update localStorage (also for coursesData)
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('coursesData', JSON.stringify(courses));
  }, [courses]);

  // Each time specAndExtraSpecTotal is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('specAndExtraSpecTotal', JSON.stringify(specAndExtraSpecTotal));
  }, [specAndExtraSpecTotal]);

  // Each time track is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('track', JSON.stringify(track));
  }, [track]);

  // Each time specialization is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('specialization', JSON.stringify(specialization));
  }, [specialization]);

  // Each time extra specialization is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('extraSpecialization', JSON.stringify(extraSpecialization));
  }, [extraSpecialization]);

  // Each time highlight is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('highlight', JSON.stringify(highlight));
  }, [highlight]);

  // Each time ectsAverage is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('average', JSON.stringify(ectsAverage));
  }, [ectsAverage]);

  useEffect(() => {
    setSpecAndExtraSpecTotal(findCoursesPassed().specAndExtraSpecTotal);
    findCoursesPassed();
  }, [track, specialization, extraSpecialization]);

  // Calculate average grade
  const findAverage = () => {
    const filteredCourses = courses.filter(course => course.dontCalc !== true)
    const { sum, totalEcts } = calculateAverageAux(filteredCourses);
    const average = (sum / totalEcts) ? (sum / totalEcts).toFixed(2) : '0.00';
    return {
      average: average,
      totalEcts
    };
  };

  // Sum all courses Passed per category
  const findCoursesPassed = () => {
    // Compulsory
    const compTotal = courses.filter(course => course.type === "compulsory");
    const compPassed = compTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    // General Education
    const genEduTotal = courses.filter(course => course.type === "general-edu");
    const genEduPassed = genEduTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    // Thesis
    const thesisTotal = courses.filter(course => course.type === "thesis");
    const thesisPassed = thesisTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    // Project
    const projectCourses = courses.filter(course => 
      course.projectFor === track
    );
    const projectPassed = projectCourses.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    // Track compulsory (calculate separately those needed for spec and those available for track)
    const trackCompCoursesAll = courses.filter(course => course.type === "track-compulsory");
    const trackAndSpecTotal = filterTrackCompCourses(trackCompCoursesAll, track, specialization, extraSpecialization);
    const trackCompPassed = trackAndSpecTotal.trackCompTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    const trackCompPassedToCount = specialization === '7'
      ? Math.min(4, trackCompPassed.length) // No spec, up to 4 comp can count 
      : extraSpecialization === '7'
        ? Math.min(2, trackCompPassed.length) // Only 1 spec selected, up to 2 comp can count
        : specAndExtraSpecTotal === 3
          ? Math.min(1, trackCompPassed.length) // 2 specs selected with 1 common course, up to 1 comp can count
          : 0 // 2 specs selected without common courses, NO comp can count
    ;
    const specializationPassed = trackAndSpecTotal.specializationTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);
    const extraSpecializationPassed = trackAndSpecTotal.extraSpecializationTotal.filter(course => course.grade >= MIN_PASSABLE_GRADE && course.grade <= MAX_PASSABLE_GRADE);

    const electiveAll = courses.filter(course => course.specialization);
    const electiveTotalNumber = extraSpecialization === '7'
      // Only Track or only Track and Spec chosen, no Extra Spec, 4 elective needed
      ? MAX_ELECTIVE_FOR_TRACK
      // Both Spec chosen and Extra Spec chosen, 4 elective needed for each
      : MAX_ELECTIVE_FOR_TWO_SPECS
    ;

    const electivePassedNumber = getNumberOfPassedElective(electiveAll, track, specialization, extraSpecialization);

    return {
      compTotal: compTotal.length,
      compPassed: compPassed.length,
      genEduTotal: genEduTotal.length,
      genEduPassed: genEduPassed.length,
      thesisTotal: thesisTotal.length,
      thesisPassed: thesisPassed.length,
      trackCompSpecTotal: 4,
      trackCompSpecPassed: (trackCompPassedToCount + specializationPassed.length + extraSpecializationPassed.length),
      specAndExtraSpecTotal: (trackAndSpecTotal.specializationTotal.length + trackAndSpecTotal.extraSpecializationTotal.length),
      projectPassed: Math.min(1, projectPassed.length),
      electiveTotal: electiveTotalNumber,
      electivePassed: electivePassedNumber
    };
  };

  // Set <tr> class based on Track, Specialization, and Extra Specialization
  const getClassName = (course) => {
    let className = "course-row";
    if (highlight) {
      if (track === "A") {
        if (course.neededFor) {
          const isNeededForSpec = course.neededFor.includes(`s${specialization}`) && !course.neededFor.includes(`${extraSpecialization}`)
          const isNeededForExtraSpec = !course.neededFor.includes(`s${specialization}`) && course.neededFor.includes(`${extraSpecialization}`);
          const isNeededForBothSpecs = course.neededFor.includes(`s${specialization}`) && course.neededFor.includes(`${extraSpecialization}`);
          const isAvailableForTrackA = course.neededFor.split(";").some(s => TRACK_A_SPECIALIZATIONS.includes(s));
          // Course is available for Track "A" but not needed for current Specializations
          if (isAvailableForTrackA && !isNeededForSpec && !isNeededForExtraSpec && !isNeededForBothSpecs) {
            className = "course-row highlighted-row-track";
          }
          // Course is needed for current Specialization of Track "A"
          else if (isAvailableForTrackA && isNeededForSpec) {
            className = "course-row highlighted-row-spec";
          }
          // Course is needed for current Extra Specialization of Track "A"
          else if (isAvailableForTrackA && isNeededForExtraSpec) {
            className = "course-row highlighted-row-extra-spec"
          }
          // Course is needed for both current Specializations of Track "A"
          else if (isAvailableForTrackA && isNeededForBothSpecs) {
            className = "course-row highlighted-row-both-specs"
          }
        }
        else if (course.projectFor === "A") {
          className = "course-row highlighted-row-project";
        }
      }
      else if (track === "B") {
        if (course.neededFor) {
          const isNeededForSpec = course.neededFor.includes(`s${specialization}`) && !course.neededFor.includes(`${extraSpecialization}`)
          const isNeededForExtraSpec = !course.neededFor.includes(`s${specialization}`) && course.neededFor.includes(`${extraSpecialization}`);
          const isNeededForBothSpecs = course.neededFor.includes(`s${specialization}`) && course.neededFor.includes(`${extraSpecialization}`);
          const isAvailableForTrackB = course.neededFor.split(";").some(s => TRACK_B_SPECIALIZATIONS.includes(s));
          // Course is available for Track "B" but not needed for current Specialization
          if (isAvailableForTrackB && !isNeededForSpec && !isNeededForExtraSpec && !isNeededForBothSpecs) {
            className = "course-row highlighted-row-track";
          }
          // Course is needed for current Specialization of Track "B"
          else if (isAvailableForTrackB && isNeededForSpec) {
            className = "course-row highlighted-row-spec";
          }
          // Course is needed for current Extra Specialization of Track "B"
          else if (isAvailableForTrackB && isNeededForExtraSpec) {
            className = "course-row highlighted-row-extra-spec"
          }
          // Course is needed for both current Specializations of Track "B"
          else if (isAvailableForTrackB && isNeededForBothSpecs) {
            className = "course-row highlighted-row-both-specs"
          }
        } else if (course.projectFor === "B") {
          className = "course-row highlighted-row-project";
        }
      }

      if (course.specialization) {
        const isNeededForSpec = course.specialization.includes(`s${specialization}`) && !course.specialization.includes(`${extraSpecialization}`)
        const isNeededForExtraSpec = !course.specialization.includes(`s${specialization}`) && course.specialization.includes(`${extraSpecialization}`);
        const isNeededForBothSpecs = course.specialization.includes(`s${specialization}`) && course.specialization.includes(`${extraSpecialization}`);
        const isAvailableForTrackA = course.specialization.split(";").some(s => TRACK_A_SPECIALIZATIONS.includes(s));
        const isAvailableForTrackB = course.specialization.split(";").some(s => TRACK_B_SPECIALIZATIONS.includes(s));

        if (track === "A") {
          // Course is available for Track "A" but not needed for current Specializations
          if (isAvailableForTrackA && !isNeededForSpec && !isNeededForExtraSpec && !isNeededForBothSpecs) {
            className = "course-row highlighted-row-elective-track";
          }
          // Course is needed for current Specialization of Track "A"
          else if (isAvailableForTrackA && isNeededForSpec) {
            className = "course-row highlighted-row-elective-spec";
          }
          // Course is needed for current Extra Specialization of Track "A"
          else if (isAvailableForTrackA && isNeededForExtraSpec) {
            className = "course-row highlighted-row-elective-extra-spec"
          }
          // Course is needed for both current Specializations of Track "A"
          else if (isAvailableForTrackA && isNeededForBothSpecs) {
            className = "course-row highlighted-row-elective-both-specs"
          }
        }
        else if (track === "B") {
          // Course is available for Track "B" but not needed for current Specializations
          if (isAvailableForTrackB && !isNeededForSpec && !isNeededForExtraSpec && !isNeededForBothSpecs) {
            className = "course-row highlighted-row-elective-track";
          }
          // Course is needed for current Specialization of Track "B"
          else if (isAvailableForTrackB && isNeededForSpec) {
            className = "course-row highlighted-row-elective-spec";
          }
          // Course is needed for current Extra Specialization of Track "B"
          else if (isAvailableForTrackB && isNeededForExtraSpec) {
            className = "course-row highlighted-row-elective-extra-spec"
          }
          // Course is needed for both current Specializations of Track "B"
          else if (isAvailableForTrackB && isNeededForBothSpecs) {
            className = "course-row highlighted-row-elective-both-specs"
          }
        }
      }
    }
    return className;
  };

  return (
    <div className="main-wrapper">
      <StudentInfo track={track} setTrack={setTrack} specialization={specialization} setSpecialization={setSpecialization} extraSpecialization={extraSpecialization} setExtraSpecialization={setExtraSpecialization} highlight={highlight} setHighlight={setHighlight} findAverage={findAverage} findCoursesPassed={findCoursesPassed}/>
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
                      <th className="column-header column-header-course">Μάθημα</th>
                      <th className="column-header column-header-ects">ECTS</th>
                      <th className="column-header column-header-grade">Βαθμός</th>
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
                    // <tr className="course-row" key={courses.findIndex(item => item.course === course.course)}>
                    <tr className={getClassName(course)} key={courses.findIndex(item => item.course === course.course)}>

                      <td data-label="" className="course-cell" title={course.course}>
                        {getClassName(course).includes("highlighted-row-spec")
                          ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΕΙΔΙΚΕΥΣΗΣ <strong style={{ fontSize: '10px' }}>S{specialization}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 2</span>} />
                          : getClassName(course).includes("highlighted-row-track")
                            ? specAndExtraSpecTotal === 0
                              ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 4</span>} />
                              : specAndExtraSpecTotal === 2
                                ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 2</span>} />
                                : specAndExtraSpecTotal === 3
                                  ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΧΡΕΙΑΖΕΤΑΙ 1</span>} />
                                  : <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΔΕΝ ΧΡΕΙΑΖΕΤΑΙ</span>} />
                            : getClassName(course).includes("highlighted-row-project")
                              ? <InfoTip className="info-tip" text={<span>PROJECT ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΧΡΕΙΑΖΕΤΑΙ 1</span>} />
                              : getClassName(course).includes("highlighted-row-both-specs")
                                ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΕΙΔΙΚΕΥΣΕΩΝ <strong style={{ fontSize: '10px' }}>S{specialization}</strong>, <strong style={{ fontSize: '10px' }}>S{extraSpecialization}</strong>  - ΧΡΕΙΑΖETAI ΑΛΛΟ 1 ΓΙΑ ΚΑΘΕΜΙΑ</span>} />
                                : getClassName(course).includes("highlighted-row-extra-spec")
                                  ? <InfoTip className="info-tip" text={<span>ΥΠΟΧΡΕΩΤΙΚΟ ΕΙΔΙΚΕΥΣΗΣ <strong style={{ fontSize: '10px' }}>S{extraSpecialization}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 2</span>} />
                                  : getClassName(course).includes("highlighted-row-elective-track")
                                    ? specialization === '7'
                                      ? <InfoTip className="info-tip" text={<span>ΒΑΣΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 4</span>} />
                                      : <InfoTip className="info-tip" text={<span>ΒΑΣΙΚΟ ΚΑΤΕΥΘΥΝΣΗΣ <strong style={{ fontSize: '10px' }}>{track}</strong> - ΔΕΝ ΧΡΕΙΑΖΕΤΑΙ</span>} />
                                    : getClassName(course).includes("highlighted-row-elective-spec")
                                      ? <InfoTip className="info-tip" text={<span>ΒΑΣΙΚΟ ΕΙΔΙΚΕΥΣΗΣ <strong style={{ fontSize: '10px' }}>S{specialization}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 4</span>} />
                                      : getClassName(course).includes("highlighted-row-elective-extra-spec")
                                        ? <InfoTip className="info-tip" text={<span>ΒΑΣΙΚΟ ΕΙΔΙΚΕΥΣΗΣ <strong style={{ fontSize: '10px' }}>S{extraSpecialization}</strong> - ΧΡΕΙΑΖΟΝΤΑΙ 4</span>} />
                                        : getClassName(course).includes("highlighted-row-elective-both-specs")
                                          ? <InfoTip className="info-tip" text={<span>ΒΑΣΙΚΟ ΕΙΔΙΚΕΥΣΕΩΝ <strong style={{ fontSize: '10px' }}>S{specialization}</strong>, <strong style={{ fontSize: '10px' }}>S{extraSpecialization}</strong>  - ΜΕΤΡΑΕΙ ΜΟΝΟ ΓΙΑ ΤΗ ΜΙΑ</span>} />
                                          : null
                        }
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
                        <input className="course-input" type="text" inputMode="decimal" value={course.ects} onChange={(e) => {
                          const newCourses = [...courses];
                          const currentIndex = getIndex(courses, course);
                          newCourses[currentIndex].ects = e.target.value;
                          setCourses(newCourses);
                          setCoursesData(newCourses);
                        }} />
                      </td>
                      <td data-label="Βαθμός" className="grade-cell">
                        <input
                          className="course-input"
                          type="text"
                          inputMode="decimal"
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
                            newCourses[currentIndex].completed = (e.target.value >= MIN_PASSABLE_GRADE && e.target.value <= MAX_PASSABLE_GRADE) ? true : false;
                            setCourses(newCourses);
                            setCoursesData(newCourses);
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
          <tbody>
            <tr className="grouplabel">
              <th colSpan="3" className="section-label section-button">
                <button onClick={handleAddCourse}>Προσθήκη μαθήματος</button>
              </th>
            </tr>
          </tbody>
      </table>

      {/* <button onClick={handleAddCourse}>Προσθήκη μαθήματος</button> */}
      <AddCourseModal
        showModal={showModal}
        closeModal={handleModalClose}
        addNewCourse={addNewCourse}
        setShowModal={setShowModal}
      />
    <FloatingButton />
    </div>
  );
}

export default MainPage;