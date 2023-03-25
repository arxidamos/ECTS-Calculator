import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/Pages/MainPage';
import Export from './components/Pages/Export';
import Contact from './components/Pages/Contact';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';

function App() {
  const [coursesData, setCoursesData] = useState([]);

  // const handleCoursesDataUpdate = (newData) => {
  //   setCoursesData(newData);
  // };

  // useEffect(() => {
  //   setCoursesData(coursesData);
  //   console.log(coursesData[0]);
  // }, [coursesData])

  return (
    <BrowserRouter>
      <Navigation />
      <div className="pages">
        <Routes>
          <Route path="/" element={ <MainPage coursesData={coursesData} setCoursesData={setCoursesData} /> } />
          <Route path="/download" element={ <Export coursesData={coursesData} /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
          <Route path="/terms-of-service" element={ <TermsOfService /> } />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;