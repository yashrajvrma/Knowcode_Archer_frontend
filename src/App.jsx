import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import TranscriptionPage from './pages/transcriptionpage';
import LanguageSelectionPage from './pages/LanguageSelectionPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transcription" element={<TranscriptionPage />} />
            <Route path="/language-selection" element={<LanguageSelectionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
