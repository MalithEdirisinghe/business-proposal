import React, { useState } from "react";
import "./EditTextLogo.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const EditTextLogo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  // Updated state variables to match API parameters
  const [logoName, setLogoName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontSize, setFontSize] = useState(22);
  const [position, setPosition] = useState("bottom");
  const [nameColor, setNameColor] = useState("yellow");
  const [sloganColor, setSloganColor] = useState("purple");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleExport = async () => {
    if (!imageUrl) {
      alert("No logo image to edit.");
      return;
    }

    setIsGenerating(true);
    setShowModal(true);

    try {
      const response = await fetch(imageUrl);
      const logoBlob = await response.blob();

      // Updated FormData to include all API parameters
      const formData = new FormData();
      formData.append("logo", logoBlob, "logo.png");
      formData.append("name", logoName);
      formData.append("slogan", slogan);
      formData.append("background", backgroundColor);
      formData.append("name_font_size", fontSize);
      formData.append("position", position);
      formData.append("name_color", nameColor);
      formData.append("slogan_color", sloganColor);

      const apiResponse = await fetch("http://127.0.0.1:5000/edit-logo", {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        const editedBlob = await apiResponse.blob();
        setGeneratedImageBlob(editedBlob);
      } else {
        const errorText = await apiResponse.text();
        alert(`Failed to edit the logo: ${errorText}`);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the logo.");
      setShowModal(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // Rest of the utility functions remain the same
  const downloadGeneratedImage = () => {
    if (!generatedImageBlob) return;
    const url = URL.createObjectURL(generatedImageBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited-logo.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCancel = () => {
    navigate("/text-logo");
  };

  return (
    <div className="edit-text-logo-container">
      {/* Left Panel remains the same */}
      <div className="left-panel">
        <div className="branding">
          <h1>BizConnect Lanka</h1>
        </div>
        <div className="instruction">
          <h2>Edit Logo</h2>
        </div>
        <div className="dots-section">
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot blue"></span>
          <span className="dot red"></span>
        </div>
      </div>

      {/* Updated Right Panel with new controls */}
      <div className="right-panel">
        <h2>Preview Your Logo</h2>
        <div className="image-preview">
          {imageUrl ? (
            <img src={imageUrl} alt="Generated Logo" className="preview-logo-image" />
          ) : (
            <div className="placeholder">
              <p>Logo Preview</p>
            </div>
          )}
        </div>

        <div className="controls">
          <div className="control-row">
            <label htmlFor="logo-name">Logo Name:</label>
            <input
              id="logo-name"
              type="text"
              value={logoName}
              onChange={(e) => setLogoName(e.target.value)}
              placeholder="Enter your logo name"
            />
          </div>

          <div className="control-row">
            <label htmlFor="slogan">Slogan:</label>
            <input
              id="slogan"
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Enter your slogan"
            />
          </div>

          <div className="control-row">
            <label htmlFor="font-size">Font Size:</label>
            <input
              id="font-size"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              min="10"
              max="100"
            />
          </div>

          <div className="control-row">
            <label htmlFor="position">Position:</label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="control-row">
            <label htmlFor="background-color">Background Color:</label>
            <select
              id="background-color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="brown">Brown</option>
              <option value="gray">Gray</option>
            </select>
          </div>

          <div className="control-row">
            <label htmlFor="name-color">Name Color:</label>
            <select
              id="name-color"
              value={nameColor}
              onChange={(e) => setNameColor(e.target.value)}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="brown">Brown</option>
              <option value="gray">Gray</option>
            </select>
          </div>

          <div className="control-row">
            <label htmlFor="slogan-color">Slogan Color:</label>
            <select
              id="slogan-color"
              value={sloganColor}
              onChange={(e) => setSloganColor(e.target.value)}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="brown">Brown</option>
              <option value="gray">Gray</option>
            </select>
          </div>
        </div>

        <div className="button-row">
          <button className="export-button" onClick={handleExport}>
            Generate
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {/* Modal remains the same */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes className="close-icon" onClick={() => setShowModal(false)} />
            {isGenerating ? (
              <>
                <div className="spinner"></div>
                <p>Processing your request...</p>
              </>
            ) : (
              <>
                {generatedImageBlob && (
                  <img
                    src={URL.createObjectURL(generatedImageBlob)}
                    alt="Edited Logo"
                    className="generated-logo-image"
                  />
                )}
                <div className="modal-buttons">
                  <button onClick={downloadGeneratedImage}>Download</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTextLogo;
