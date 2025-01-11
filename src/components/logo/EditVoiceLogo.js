import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditVoiceLogo.css";
import { FaMicrophone, FaArrowLeft } from "react-icons/fa";

const EditVoiceLogo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the image URL from the passed state
  const imageUrl = location.state?.imageUrl;

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="edit-voice-logo-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="branding">
          <h1>BizConnect Lanka</h1>
        </div>
        <div className="instruction">
          <h2>Edit your logo as you wish by voice commands</h2>
        </div>
        <div className="dots-section">
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot blue"></span>
          <span className="dot red"></span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h2>Tell Us your commands...</h2>
        <div className="image-placeholder">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Logo to Edit"
              className="logo-image"
            />
          ) : (
            <p>No logo image available. Please go back and generate one.</p>
          )}
        </div>
        <div className="microphone-icon">
          <FaMicrophone size={80} color="purple" />
        </div>
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft /> Back
        </button>
      </div>
    </div>
  );
};

export default EditVoiceLogo;
