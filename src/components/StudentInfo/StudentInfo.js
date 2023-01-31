import React from 'react';
import "./StudentInfo.css"
import { useEffect } from "react";

const StudentInfo = ({ track, setTrack, specialization, setSpecialization }) => {

  const handleTrackChange = event => {
    setTrack(event.target.value);
  };

  const handleSpecializationChange = event => {
    setSpecialization(event.target.value);
  };

  return (
    <form className="student-info-form">
      <label className="grid-item" htmlFor="track">Κατεύθυνση:</label>
      <select className="grid-item" id="track" value={track} onChange={handleTrackChange}>
        <option value="A">A: Επιστήμη Υπολογιστών</option>
        <option value="B">B: Μηχανική Υπολογιστών & Τηλεπικοινωνιών </option>
      </select>
      <label className="grid-item" htmlFor="specialization">Ειδικότητα:</label>
      <select
        className="grid-item "
        id="specialization"
        value={specialization}
        onChange={handleSpecializationChange}
      >
        {track === 'A' ? (
          <>
            <option value={1}>S1: Θεμελιώσεις της Πληροφορικής</option>
            <option value={2}>S2: Διαχείριση δεδομένων και γνώσης</option>
            <option value={3}>S3: Λογισμικό</option>
            <option value={7}>Χωρίς ειδίκευση</option>
          </>
        ) : (
          <>
            <option value={4}>S4: Υλικό και Αρχιτεκτονική</option>
            <option value={5}>S5: Επικοινωνίες και Δικτύωση</option>
            <option value={6}>S6: Επεξεργασία Σήματος και Πληροφορίας</option>
            <option value={7}>Χωρίς ειδίκευση</option>
          </>
        )}
      </select>
      {/* <button type="submit">Submit</button> */}
      <label className="grid-item" htmlFor="showHints">
        Υπολογισμός Πτυχίου:
      </label>
      <label className="switch">
        <input id="showHints" type="checkbox" />
         {/* onChange={handleHighlight} /> */}
        <span className="slider round"></span>
      </label>
    </form>
  );
};

export default StudentInfo;
