import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './SelectMethod.css';

const SelectMethod = () => {
    const navigate = useNavigate(); // Initialize navigate

    // Function to handle button click
    const handleButtonClick = (method) => {
        if (method === 'Text') {
            navigate('/web-text'); // Navigate to WebText.js
        } else if (method === 'Voice') {
            navigate('/web-voice'); // Navigate to WebVoice.js
        }
    };


    return (
        <div className="select-language-container">
            <main className="select-language-content">
                <h2>Turn Your Ideas into Professional Websites</h2>
                <p>
                Effortlessly transform your ideas into fully functional, professional websites with our user-friendly platform. Whether you prefer speaking or typing,
                our system makes it easy to create websites tailored to your needs in English.

                </p>
                <ul>
                    <li>
                        <strong>Voice Input:</strong> Share your website requirements in spoken English, 
                        and our platform will guide you through a simple form to capture all necessary details and transform your input into a professional website.

                    </li>
                    <li>
                        <strong>Text Input:</strong> Enter your website specifications directly into our form in English, 
                        and our intelligent system will organize the information to create a structured and professional layout.

                    </li>
                </ul>
                <p>
                Our intuitive form ensures you can provide details such as your website's purpose, content, images, and contact information with ease. From concept to creation, 
                we help you bring your website to life with precision, clarity, and functionality, meeting global standards
                </p>

                <div className="button-container">
                    <button className="text-button" onClick={() => handleButtonClick('Text')}>TEXT</button>
                    <button className="voice-button" onClick={() => handleButtonClick('Voice')}>VOICE</button>
                </div>
            </main>
            {/* Footer */}
            <footers className="select-language-footer">
            </footers>
        </div>
    );
};

export default SelectMethod;
