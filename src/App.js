import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/Pages/MainPage';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="pages">
        <Routes>
          <Route path="/" element={ <MainPage/> } />
          <Route path="/about" element={ <About/> } />
          <Route path="/contact" element={ <Contact/> } />
          <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
          <Route path="/terms-of-service" element={ <TermsOfService /> } />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;