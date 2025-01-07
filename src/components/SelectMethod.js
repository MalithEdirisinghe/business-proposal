import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SelectMethod.css'; // Import the CSS for styling

const SelectMethod = () => {
    const navigate = useNavigate(); // Initialize navigate

    // Function to handle button click
    const handleButtonClick = (method) => {
        navigate('/select-language', { state: { method } }); // Navigate with the method value
    };

    return (
        <div className="select-language-container">
            <main className="select-language-content">
                <h2>Turn Ideas into Investor-Ready Proposals</h2>
                <p>
                    Effortlessly convert your ideas into professional, investor-ready business proposals with our powerful platform.
                    Whether you prefer speaking or typing, our system seamlessly handles both Sinhala and English inputs.
                </p>
                <ul>
                    <li>
                        <strong>Voice Input:</strong> Record your ideas in your natural language, and let our platform instantly transcribe
                        and translate them into well-structured, comprehensive business proposals in English.
                    </li>
                    <li>
                        <strong>Text Input:</strong> Type your business proposal in either Sinhala or English, and our intelligent system will
                        organize and refine your content, presenting it in a format designed to impress investors.
                    </li>
                </ul>
                <p>
                    Our solution ensures that language barriers and technical expertise are never an obstacle. From concept to proposal,
                    we help you present your business ideas with professionalism, clarity, and precision, meeting the highest global standards.
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
