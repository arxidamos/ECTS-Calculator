import React, { useState, useEffect, useRef } from 'react';
import './AddCourseModal.css'

const gradeStyleNumbers = /^([0-9]|10)([,.]\d{1,2})?$/

function AddCourseModal({ showModal, setShowModal, closeModal, addNewCourse }) {
  const [name, setName] = useState("");
  const [ects, setEcts] = useState("");
  const [grade, setGrade] = useState("");

  const [validName, setValidName] = useState(true);
  const [validEcts, setValidEcts] = useState(true);
  const [validGrade, setValidGrade] = useState(true);

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  //   if (!event.target.value) {
  //     setNameError("Υποχρεωτικό πεδίο");
  //   } else {
  //     setNameError("");
  //   }
  // };

  // const handleEctsChange = (event) => {
  //   setEcts(event.target.value);
  //   if (!event.target.value) {
  //     setEctsError("Υποχρεωτικό πεδίο");
  //   } else if (isNaN(event.target.value)) {
  //     setEctsError("Πρέπει να είναι αριθμός");
  //   } else if (event.target.value < 2) {
  //     setEctsError("Πρέπει να είναι μεγαλύτερο από 1");
  //   } else {
  //     setEctsError("");
  //   }
  // };

  // const handleGradeChange = (event) => {
  //   setGrade(event.target.value);
  //   if (isNaN(event.target.value)) {
  //     setGradeError("Πρέπει να είναι αριθμός");
  //   } else if (event.target.value < 0 || event.target.value > 10) {
  //     setGradeError("Πρέπει να είναι από 0 έως 10");
  //   } else {
  //     setGradeError("");
  //   }
  // };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setValidName(value !== "");
  };
  
  const handleEctsChange = (event) => {
    const value = event.target.value;
    setEcts(value);
    setValidEcts(value !== "" && Number.isInteger(parseFloat(value)) && parseInt(value) >= 2);
  };
  
  const handleGradeChange = (event) => {
    const value = event.target.value;
    setGrade(value);
    // setValidGrade(value === "" || (Number.isInteger(parseFloat(value)) && parseInt(value) >= 0 && parseInt(value) <= 10) || !numbersOnly.test(value));
    setValidGrade(gradeStyleNumbers.test(value));
  };

  useEffect (() => {
    validateInput('course', name);
    validateInput('ects', ects);
    validateInput('grade', grade);
  }, [])

  const validateInput = (id, value) => {
    switch (id) {
      case 'course':
        setName(value);
        console.log(`name=${name}`);
        setValidName(value !== "");
        break;
      case 'ects':
        setEcts(value);
        console.log(`ects=${ects}`);
        setValidEcts(value !== "" && Number.isInteger(parseFloat(value)) && parseInt(value) >= 2);
        break;
      case 'grade':
        setGrade(value);
        console.log(`grade=${grade}`);
        setValidGrade(gradeStyleNumbers.test(value));
        // setValidGrade(value === "" || (Number.isInteger(parseFloat(value)) && parseInt(value) >= 0 && parseInt(value) <= 10));
        break;
      default:
        break;
    }
    console.log(validName, validEcts, validGrade)
  };

  const handleOk = (event) => {
    event.preventDefault();
    // if (!name || !ects || !grade) {
    //   alert("Παρακαλούμε συμπληρώστε τα υποχρεωτικά πεδία");
    //   return;
    // }
    // if (nameError || ectsError || gradeError) {
    //   alert("Παρακαλούμε συμπληρώστε σωστά τα πεδία");
    //   return;
    // }
    
    // if (name && ects) {
    //   const newCourse = {name, ects, grade};
    //   addNewCourse({
    //     userCourse: newCourse
    //   });
    // }
  
    validateInput('course', name);
    validateInput('ects', ects);
    validateInput('grade', grade);

    if (validName && validEcts && validGrade) {
      const newCourse = {course: name, ects: ects, grade: grade, type: "elective-specialization"};
      addNewCourse({
        // userCourse: newCourse
        course: name, ects: ects, grade: grade, type: "elective-specialization", completed: grade >= 5 && grade <= 10 ? true : false
      });

      closeModal();
      // validateInput('course', '1');
      // validateInput('ects', 2);
      // validateInput('grade', 5);
    }
  };



  // if (!showModal) {
  //   return null;
  // }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content">
          <button className="x-button" onClick={closeModal}><span>&times;</span></button>
            <div className="modal-header">
              <h2>Προσθήκη Μαθήματος</h2>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="course" className={validName ? "" : "invalid"}>Μάθημα{validName ? "" : " *"} </label>
                <input
                  type="text"
                  id="course"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className={validName ? "" : "invalid"}
                />
              </div>
              <div className="form-group">
              <label htmlFor="ects" className={validEcts ? "" : "invalid"}>ECTS{validEcts ? "" : " *"} </label>
                <input
                  type="number"
                  id="ects"
                  value={ects}
                  inputMode="decimal"
                  onChange={handleEctsChange}
                  min="2"
                  required
                  className={validEcts ? "" : "invalid"}
                />
              </div>
              <div className="form-group">
              <label htmlFor="grade" className={validGrade ? "" : "invalid"}>Βαθμός{validGrade ? "" : " *"} </label>
                <input
                  type="text"
                  id="grade"
                  value={grade}
                  inputMode="decimal"
                  onChange={handleGradeChange}
                  min="0"
                  max="10"
                  className={validGrade ? "" : "invalid"}
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button onClick={closeModal}>Άκυρο</button>
              <button onClick={handleOk}>Αποθήκευση</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCourseModal;
