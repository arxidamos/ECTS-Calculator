import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

function convertToExcel(courses) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(courses);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return workbook;
}

function downloadAsExcel(workbook, filename) {
  // Generate binary data for excel file
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  
  // Convert binary to buffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i += 1) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
  
  // Convert buffer data to blob object
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
  // Download file in IE
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  }
  // Download file in other browsers
  else {
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
}

function downloadAsJson(data, filename) {
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

const Export = ({ coursesData }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const translatedData = coursesData.map(item => ({
      ΜΑΘΗΜΑ: item.course,
      ECTS: item.ects,
      ΒΑΘΜΟΣ: item.grade,
    }));
    setCourses(translatedData);
  }, [coursesData])


  const handleExcelDownload = () => {
    const workbook = convertToExcel(courses);
    downloadAsExcel(workbook, 'data.xlsx');
  };

  const handleJsonDownload = () => {
    downloadAsJson(courses, 'data.json');
  };

  return (
    <div>
      <h1>Εξαγωγή βαθμολογίας σε Excel</h1>
      <button onClick={handleExcelDownload}>
        Κατέβασμα Excel
      </button>
      <button onClick={handleJsonDownload}>
        Κατέβασμα JSON
      </button>
    </div>
  );
}

export default Export;