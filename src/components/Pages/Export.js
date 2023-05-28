import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import './Export.css'

const convertToExcel = (courses) => {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(courses);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return workbook;
}

const downloadAsExcel = (workbook, filename) => {
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

const sendCoursesReceiveExcel = async (data, filename) => {
  try {
    console.log(data.programInfo);
    // const response = await fetch('http://localhost:5000/api/updateExcel', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });
    // // const responseData = await response.json();
    // // return responseData;
    // if (!response.ok) {
    //   throw new Error('Response from server not ok');
    // }

    // // Get xlsx from response
    // const blob = await response.blob();

    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = filename;
    // document.body.appendChild(a);
    // a.click();
    // setTimeout(() => {
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(url);
    // }, 0);
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

// const readExcelFile = (courses) => {
//   const file = require('/home/dimos/Desktop/ectsTool/ects-tool/src/Οδηγός για την λήψη πτυχίου.xls');
//   const workbook = XLSX.readFile(file);
//   const sheetName = 'Sheet1'; // replace with your sheet name
//   const sheet = workbook.Sheets[sheetName];

//   // Find the column index of column A
//   const columnAIndex = XLSX.utils.decode_col('C');

//   // Find the column index of column C
//   const columnCIndex = XLSX.utils.decode_col('E');

//   courses.forEach((item, rowIndex) => {
//     const cellAddress = XLSX.utils.encode_cell({
//       r: rowIndex + 1, // add 1 because row indexing starts from 1
//       c: columnAIndex,
//     });
//     const cell = sheet[cellAddress];
//     if (cell && cell.v.includes(item.course)) {
//       const cellCAddress = XLSX.utils.encode_cell({
//         r: rowIndex + 1,
//         c: columnCIndex,
//       });
//       XLSX.utils.sheet_set_cell(sheet, cellCAddress, item.grade);
//     }
//   });

//   XLSX.writeFile(workbook, 'excel_me_vathmous.xlsx');
// }

const Export = ({ coursesData, programData }) => {
  const [courses, setCourses] = useState([]);
  const [programInfo, setProgramInfo] = useState([]);

  useEffect(() => {
    setCourses(coursesData);
  }, [coursesData])

  useEffect(() => {
    setProgramInfo(programData);
  }, [programData])

  const handleExcelDownload = () => {
    const workbook = convertToExcel(courses);
    downloadAsExcel(workbook, 'data.xlsx');
  };

  const handleJsonDownload = () => {
    downloadAsJson(courses, 'data.json');
  };

  const handleSpecialDownload = async () => {
    // readExcelFile(courses);
    try {
      console.log(courses[0]);
      await sendCoursesReceiveExcel({courses: courses, programInfo: programInfo}, 'Οδηγός για τη λήψη πτυχίου.xlsx');
    }
    catch (error) {
      console.error(error);
    }
  };

 

  return (
    <div>
      <h2>Εξαγωγή βαθμολογίας</h2>
      <div className="button-area">
        <button onClick={handleExcelDownload} className="chunky-button">
          Κατέβασμα Excel
        </button>
        <button onClick={handleJsonDownload} className="chunky-button">
          Κατέβασμα JSON
        </button>
        <button onClick={handleSpecialDownload} className="chunky-button">
          Κατέβασμα sosovaro
        </button>
      </div>
    </div>
  );
}

export default Export;



// const workbook = XLSX.readFile('myWorkbook.xlsx');
// const sheetName = 'Sheet1'; // replace with your sheet name
// const sheet = workbook.Sheets[sheetName];

// const data = [
//   { attr1: 'value1', attr2: 'value2' },
//   { attr1: 'value3', attr2: 'value4' },
// ];

// // Find the column index of column A
// const columnAIndex = XLSX.utils.decode_col('A');

// // Find the column index of column C
// const columnCIndex = XLSX.utils.decode_col('C');

// data.forEach((obj, rowIndex) => {
//   const cellAddress = XLSX.utils.encode_cell({
//     r: rowIndex + 1, // add 1 because row indexing starts from 1
//     c: columnAIndex,
//   });
//   const cell = sheet[cellAddress];
//   if (cell && cell.v === obj.attr1) {
//     const cellCAddress = XLSX.utils.encode_cell({
//       r: rowIndex + 1,
//       c: columnCIndex,
//     });
//     XLSX.utils.sheet_set_cell(sheet, cellCAddress, obj.newValue);
//   }
// });

// XLSX.writeFile(workbook, 'myWorkbookModified.xlsx');


// const postData = async (data) => {
//   try {
//     const response = await fetch('/api/updateExcel', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error(error);
//   }
// };

