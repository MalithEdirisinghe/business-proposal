import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LanguageSelect.css';
import sinhalaIcon from '../assets/sinhala.png';
import englishIcon from '../assets/english.png';

const LanguageSelect = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { method } = location.state || {}; // Destructure the passed state

  // Function to handle button click
  const handleLanguageSelect = (language) => {
    if (method === 'Text') {
      navigate('/text-record', { state: { language, method } }); // Navigate to TextRecord.js with language and method
    } else if (method === 'Voice') {
      navigate('/voice-record', { state: { language, method } }); // Navigate to VoiceRecord.js with language and method
    } else {
      console.error('Method not handled!'); // Optional: Handle unsupported methods
    }
  };

  return (
    <div className="language-select-container">
      <main className="language-select-content-select">
        <h2>{method ? `${method} Method Selected` : 'Select Your Preferred Language'}</h2>
        <p>
          {method
            ? `Please select your preferred language for the ${method.toLowerCase()} method:`
            : 'Please select your preferred language:'}
        </p>
        <div className="language-options">
          <div className="language-option">
            <img src={sinhalaIcon} alt="Sinhala Language" className="language-icon" />
            <button
              className="sinhala-button"
              onClick={() => handleLanguageSelect('Sinhala')} // Pass 'Sinhala' when clicked
            >
              Sinhala
            </button>
          </div>
          <div className="language-option">
            <img src={englishIcon} alt="English Language" className="language-icon" />
            <button
              className="english-button"
              onClick={() => handleLanguageSelect('English')} // Pass 'English' when clicked
            >
              English
            </button>
          </div>
        </div>
      </main>
      <footer className="language-select-footer"></footer>
    </div>
  );
};

export default LanguageSelect;
