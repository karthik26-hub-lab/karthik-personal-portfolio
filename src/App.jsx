import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Resume from './components/Resume';
import BackgroundWrapper from './components/BackgroundWrapper';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BackgroundWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
