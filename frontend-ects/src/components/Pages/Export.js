import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import './Export.css'
import Spinner from '../Spinner/Spinner'

const sendCoursesReceiveExcel = async (data, filename) => {
  try {
    console.log(data.programInfo);
    const response = await fetch('http://localhost:5000/api/updateExcel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    // const responseData = await response.json();
    // return responseData;
    if (!response.ok) {
      throw new Error('Response from server not ok');
    }

    // Get xlsx from response
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  catch (error) {
    console.error(error);
  }
};

const downloadAsJson = (data, filename) => {
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}


const Export = ({ coursesData, programData }) => {
  const [courses, setCourses] = useState([]);
  const [programInfo, setProgramInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCourses(coursesData);
  }, [coursesData])

  useEffect(() => {
    setProgramInfo(programData);
  }, [programData])

  const handleJsonDownload = () => {
    downloadAsJson(courses, 'data.json');
  };

  const handleExcelDownload = async () => {
    try {
      setLoading(true);
      await sendCoursesReceiveExcel({courses: courses, programInfo: programInfo}, 'Οδηγός για τη λήψη πτυχίου.xlsx');
      setLoading(false);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Εξαγωγή βαθμολογίας</h2>
      <div className="button-area">
        <button onClick={handleJsonDownload} className="download-button" disabled={loading}>
          Κατέβασμα JSON
        </button>
        <button onClick={handleExcelDownload} className="download-button" disabled={loading}>
          Κατέβασμα Excel
        </button>
        {loading && <Spinner loading={loading} />}
      </div>
    </div>
  );
}

export default Export;