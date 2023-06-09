const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const originalFilename = './Οδηγός για τη λήψη πτυχίου.xlsx';

const uniqueId = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
const filename = './ECTS di ' + uniqueId + '.xlsx';

// Middlewares
app.use(cors())
app.use(express.json());

// Match json courses with excel courses, update excel courses' grades
const updateExcelGradesAndEcts = (coursesReceived, worksheet) => {
  coursesReceived.forEach( (record) => {
    worksheet.eachRow(function(row, rowNumber) {
      if (row.getCell(3).value === record.course) {
        // Update course's grade
        if (record.grade && record.grade !== '-') {
          row.getCell(5).value = parseFloat(record.grade);
          row.getCell(5).numFmt = '#0.0';
          row.getCell(5).type = ExcelJS.ValueType.Number;
        }
        else {row.getCell(5).value = 0;
          row.getCell(5).numFmt = '#0.0';
          row.getCell(5).type = ExcelJS.ValueType.Number;
        }

        // Update course's ects
        if (record.ects && record.ects !== row.getCell(4).value) {
          row.getCell(4).value = parseInt(record.ects);
          row.getCell(4).numFmt = '#0';
          row.getCell(4).type = ExcelJS.ValueType.Number;
        }
      }
    });
  });
}

// Update program info in excel
const updateExcelProgramInfo = (programInfo, worksheet) => {
  switch (programInfo.track) {
    case 'A':
      worksheet.getCell('D8').value = 1;
      worksheet.getCell('D9').value = 0;
      break;
    case 'B':
      worksheet.getCell('D8').value = 0;
      worksheet.getCell('D9').value = 1;
      break;
    default:
      break;
  }

  switch (programInfo.spec) {
    case '1':
      worksheet.getCell('D14').value = 1;
      worksheet.getCell('D15').value = 0;
      worksheet.getCell('D16').value = 0;
      break;
    case '2':
      worksheet.getCell('D14').value = 0;
      worksheet.getCell('D15').value = 1;
      worksheet.getCell('D16').value = 0;
      break;
    case '3':
      worksheet.getCell('D14').value = 0;
      worksheet.getCell('D15').value = 0;
      worksheet.getCell('D16').value = 1;
      break;
    default:
      worksheet.getCell('D14').value = 0;
      worksheet.getCell('D15').value = 0;
      worksheet.getCell('D16').value = 0;
      break;
  }

  switch (programInfo.extraSpec) {
    case '1':
      worksheet.getCell('D17').value = 1;
      worksheet.getCell('D18').value = 0;
      worksheet.getCell('D19').value = 0;
      break;
    case '2':
      worksheet.getCell('D17').value = 0;
      worksheet.getCell('D18').value = 1;
      worksheet.getCell('D19').value = 0;
      break;
    case '3':
      worksheet.getCell('D17').value = 0;
      worksheet.getCell('D18').value = 0;
      worksheet.getCell('D19').value = 1;
      break;
    default:
      worksheet.getCell('D17').value = 0;
      worksheet.getCell('D18').value = 0;
      worksheet.getCell('D19').value = 0;
      break;
  }
}

const handleClientExcelRequest = async (req, res) => {
  try {
    // Get JSON data from request body
    const data = req.body;
    const courses = data.courses;
    const programInfo = data.programInfo;

    console.log(programInfo);
    // Load excel file
    const workbook = new ExcelJS.Workbook();
    // Make all changes in a temp file
    fs.copyFileSync(originalFilename, filename);
    await workbook.xlsx.readFile(filename);
    workbook.calcProperties.fullCalcOnLoad = true;
    const worksheet = workbook.getWorksheet('Sheet1');

    // Modify worksheet with req.body courses JSON data
    updateExcelGradesAndEcts(courses, worksheet);

    // Modify worksheet with req.body program info JSON data
    updateExcelProgramInfo(programInfo, worksheet);

    // write to file  
    await workbook.xlsx.writeFile(filename);
    
    // // Send updated data back to frontend
    res.sendFile(__dirname + filename.substring(1), (err) => {
      if (err) {
        console.error('Error while sending file:', err);
      }
      else {
        // Delete file after sending to user
        fs.unlink(filename, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
          else {
            console.log('File deleted successfully');
          }
        });
      }
    });

  }
  catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const handleClientContactSubmission = async (req, res) => {
  try {
    const {name, email, message, recaptchaResponse } = req.body;

    console.log(req.body);
    // Verify reCAPTCHA response
    try {
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
      const verificationResponse = await fetch(verificationUrl);
      const verificationData = await verificationResponse.json();

      // Verification failed
      if (!verificationData.success) {
        return res.status(400).json({ error: 'reCAPTCHA verification failed.' });
      }
    }
    catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return res.status(500).json({ error: 'An error occurred during reCAPTCHA verification.' });
    }

    const formData = {
      name,
      email,
      message,
    };
    console.log(formData)
    // Save the form data to a JSON file
    const jsonData = JSON.stringify(formData);
    const filePath = path.join(__dirname, 'form-data.json');

    fs.appendFile(filePath, jsonData + '\n', (err) => {
      if (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ message: 'An error occurred while saving the form data.' });
      } else {
        res.status(200).json({ message: 'Form data saved successfully.' });
      }
    });

  }
  catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Handle POST request to /api/updateExcel endpoint (excel request)
app.post('/api/updateExcel', handleClientExcelRequest);

// Handle POST request to /api/contact endpoint (form submission)
app.post('/api/contact', handleClientContactSubmission);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
