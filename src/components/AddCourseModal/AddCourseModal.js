import React, { useState } from 'react';

function AddCourseModal({ showModal, closeModal, addNewCourse }) {
  const [name, setName] = useState("");
  const [ects, setEcts] = useState(0);
  const [grade, setGrade] = useState(0);
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEctsChange = (event) => {
    setEcts(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleOk = (event) => {
    event.preventDefault();

    if (!name || !ects) {
      alert("Παρακαλούμε εισάγετε μάθημα και αριθμό ECTS")
      return;
    }
    
    if (name && ects) {
      const newCourse = {name, ects, grade};
      addNewCourse({
        userCourse: newCourse
      });
    }
  

    setName("");
    setEcts(0)
    setGrade(0)
    closeModal();
  };



  // if (!showModal) {
  //   return null;
  // }

  return (
    <>
      {showModal
        ? (
          <div className="modal">
            <div className="modal-content">
              <h2>Προσθήκη Μαθήματος</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="course">Μάθημα*</label>
                  <input
                    type="text"
                    id="course"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ects">ECTS*</label>
                  <input
                    type="number"
                    id="ects"
                    value={ects}
                    onChange={handleEctsChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="grade">Βαθμός</label>
                  <input
                    type="text"
                    id="grade"
                    value={grade}
                    onChange={handleGradeChange}
                  />
                </div>
              </form>
              <div className="modal-buttons">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleOk}>Add Course</button>
              </div>
            </div>
          </div>
        )
        : null
      }
    </>
  );
}

export default AddCourseModal;
