import React from 'react';

const StudentInfo = ({ track, setTrack, specialization, setSpecialization }) => {

  const handleTrackChange = event => {
    setTrack(event.target.value);
  };

  const handleSpecializationChange = event => {
    setSpecialization(event.target.value);
  };

  return (
    <form>
      <label htmlFor="track">Κατεύθυνση:</label>
      <select id="track" value={track} onChange={handleTrackChange}>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      <br />
      <br />
      <label htmlFor="specialization">Ειδικότητα:</label>
      <select
        id="specialization"
        value={specialization}
        onChange={handleSpecializationChange}
      >
        {track === 'A' ? (
          <>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </>
        ) : (
          <>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </>
        )}
      </select>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentInfo;
