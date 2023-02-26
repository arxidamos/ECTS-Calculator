import React from 'react';
import "./StudentInfo.css"
import { useEffect, useState } from "react";

const StudentInfo = ({ track, setTrack, specialization, setSpecialization, extraSpecialization, setExtraSpecialization, highlight, setHighlight, findAverage, findCoursesPassed }) => {
  const {average, totalEcts} = findAverage();
  
  const {compTotal, compPassed, genEduTotal, genEduPassed, thesisTotal, thesisPassed, trackCompSpecTotal, trackCompSpecPassed, electiveTotal, electivePassed, projectPassed} = findCoursesPassed();

  const [isChecked, setIsChecked] = useState(
    !localStorage.getItem('isChecked')
    ? false
    : JSON.parse(localStorage.getItem('isChecked'))
  );

  const handleTrackChange = event => {
    setTrack(event.target.value);
    // Reset spec and extra spec
    setSpecialization('7');
    setExtraSpecialization('7');
  };

  const handleSpecializationChange = event => {
    setSpecialization(event.target.value);
  };

  const handleExtraSpecializationChange = event => {
    setExtraSpecialization(event.target.value);
  }

  const handleHighlight = (e) => {
    setHighlight(!highlight);
    setIsChecked(e.target.checked);
    localStorage.setItem("isChecked", JSON.stringify(e.target.checked));
  }

  // Each time component refreshes, retrieve from localStorage
  useEffect(() => {
    const storedCheckedValue = localStorage.getItem('isChecked');
    setIsChecked(JSON.parse(storedCheckedValue) || false);
  }, [])

  // Each time isChecked is changed, update localStorage
  useEffect(() => {
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked]);

  useEffect( () => {
    if (specialization === extraSpecialization) {
      setExtraSpecialization('7');
    }
    console.log(`spec=${specialization}, extra=${extraSpecialization}`)

  }, [track, specialization, extraSpecialization])
  return (
    <form className="student-info-form">
      <label className="grid-item" htmlFor="track">Κατεύθυνση</label>
      <select className="grid-item" id="track" value={track} onChange={handleTrackChange}>
        <option value="A">A: Επιστήμη Υπολογιστών</option>
        <option value="B">B: Μηχανική Υπολογιστών & Τηλεπικοινωνιών </option>
      </select>
      <label className="grid-item" htmlFor="specialization">Ειδικότητα</label>
      <select
        className="grid-item "
        id="specialization"
        value={specialization}
        onChange={handleSpecializationChange}>
        {track === 'A'
          ? <>
              <option value={7}>Χωρίς ειδίκευση</option>
              <option value={1}>S1: Θεμελιώσεις της Πληροφορικής</option>
              <option value={2}>S2: Διαχείριση δεδομένων και γνώσης</option>
              <option value={3}>S3: Λογισμικό</option>
            </>
          : <>
              <option value={7}>Χωρίς ειδίκευση</option>
              <option value={4}>S4: Υλικό και Αρχιτεκτονική</option>
              <option value={5}>S5: Επικοινωνίες και Δικτύωση</option>
              <option value={6}>S6: Επεξεργασία Σήματος και Πληροφορίας</option>
            </>
        }
      </select>
      <label className="grid-item" htmlFor="extraSpecialization">Ειδικότητα Β´</label>
      <select
        className="grid-item "
        id="extraSpecialization"
        value={extraSpecialization}
        onChange={handleExtraSpecializationChange}>
        {track === 'A'
          ? (specialization === '1'
            ? <>
              <option value={'2'}>S2: Διαχείριση δεδομένων και γνώσης</option>
              <option value={'3'}>S3: Λογισμικό</option>
              <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
            </>
            : specialization === '2'
              ? <>
                <option value={'1'}>S1: Θεμελιώσεις της Πληροφορικής</option>
                <option value={'3'}>S3: Λογισμικό</option>
                <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
              </>
              : specialization === '3'
                ? <>
                  <option value={'1'}>S1: Θεμελιώσεις της Πληροφορικής</option>
                  <option value={'2'}>S2: Διαχείριση δεδομένων και γνώσης</option>
                  <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
                </>
                : <>
                  <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
                </>
          )
          : (specialization === '4'
            ? <>
              <option value={'5'}>S5: Επικοινωνίες και Δικτύωση</option>
              <option value={'6'}>S6: Επεξεργασία Σήματος και Πληροφορίας</option>
              <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
            </>
            : specialization === '5'
              ? <>
                <option value={'4'}>S4: Υλικό και Αρχιτεκτονική</option>
                <option value={'6'}>S6: Επεξεργασία Σήματος και Πληροφορίας</option>
                <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
              </>
              : specialization === '6'
                ? <>
                  <option value={'4'}>S4: Υλικό και Αρχιτεκτονική</option>
                  <option value={'5'}>S5: Επικοινωνίες και Δικτύωση</option>
                  <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
                </>
                : <>
                  <option value={'7'}>Χωρίς δεύτερη ειδίκευση</option>
                </>
          )
        }
      </select>
      {/* <button type="submit">Submit</button> */}
      <label className="grid-item last-item" htmlFor="showHints">
        Υπολογισμός Πτυχίου
      </label>
      <label className="switch">
        <input id="showHints" type="checkbox" onChange={handleHighlight} checked={isChecked}/>
        <span className="slider round"></span>
      </label>
      <div className={isChecked ? "passedCoursesInfo " : "passedCoursesInfo no-display"}>
        <div className="grid-item" title="ECTS">
          ECTS
        </div>
        <div className="grid-item grid-right">
          {totalEcts} / 240
        </div>
        <div className="grid-item" title="Μέσος Όρος">
          Μέσος όρος
        </div>
        <div className="grid-item grid-right">
          {average}
        </div>
        <div className="grid-item" title="Υποχρεωτικά">
          Υποχρεωτικά
        </div>
        <div className="grid-item grid-right">
          {compPassed} από {compTotal}
        </div>
        <div className="grid-item" title="Γενικής Παιδείας">
          Γενικής παιδείας
        </div>
        <div className="grid-item grid-right">
          {genEduPassed} από {genEduTotal}
        </div>
        <div className="grid-item" title="Κατ' επιλογή υποχρεωτικά μαθήματα για την κατοχύρωση των επιλεγμένων ειδικεύσεων και κατεύθυνσης">
          Υποχρεωτικά Κατεύθυνσης
        </div>
        <div className="grid-item grid-right">
          {trackCompSpecPassed} από {trackCompSpecTotal}
        </div>
        <div className="grid-item" title="Project">
          Project
        </div>
        <div className="grid-item grid-right">
          {projectPassed} από 1
        </div>
        <div className="grid-item" title="Πρακτική ή Πτυχιακή">
          Πρακτική / Πτυχιακή
        </div>
        <div className="grid-item grid-right">
          {thesisPassed} από {thesisTotal}
        </div>
        <div className="grid-item" title="Βασικά προαιρετικά μαθήματα για την κατοχύρωση των επιλεγμένων ειδικεύσεων ή, αν δεν επιθυμείτε ειδίκευση, της επιλεγμένης κατεύθυνσης">
          Βασικά Ειδίκευσης
        </div>
        <div className="grid-item grid-right">
          {electivePassed} από {electiveTotal}
        </div>
      </div>
    </form>
  );
};

export default StudentInfo;
