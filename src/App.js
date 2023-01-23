import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="pages">
        <Routes>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;