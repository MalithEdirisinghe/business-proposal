import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EditVoiceLogo.css';
import { FaMicrophone, FaTimes } from "react-icons/fa";

const EditVoiceLogo = () => {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const [logoName, setLogoName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontSize, setFontSize] = useState(22);
  const [position, setPosition] = useState("bottom");
  const [nameColor, setNameColor] = useState("black");
  const [sloganColor, setSloganColor] = useState("black");
  const [listeningFor, setListeningFor] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const startListening = (field) => {
    setListeningFor(field);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim().toLowerCase().replace(/[.,!?]+$/, "");

      const handleColorInput = (text, setter) => {
        const validColors = ["white", "red", "green", "blue", "black", "yellow", "purple"];
        if (validColors.includes(text)) {
          setter(text);
        } else {
          alert(`Invalid color. Please say one of: ${validColors.join(", ")}`);
        }
      };

      switch (field) {
        case "logoName":
          setLogoName(spokenText);
          break;
        case "slogan":
          setSlogan(spokenText);
          break;
        case "backgroundColor":
          handleColorInput(spokenText, setBackgroundColor);
          break;
        case "fontSize":
          const size = parseInt(spokenText, 10);
          if (!isNaN(size) && size >= 10 && size <= 100) {
            setFontSize(size);
          } else {
            alert("Invalid font size. Please say a number between 10 and 100.");
          }
          break;
        case "position":
          const validPositions = ["top", "bottom"];
          if (validPositions.includes(spokenText)) {
            setPosition(spokenText);
          } else {
            alert("Invalid position. Please say either 'top' or 'bottom'.");
          }
          break;
        case "nameColor":
          handleColorInput(spokenText, setNameColor);
          break;
        case "sloganColor":
          handleColorInput(spokenText, setSloganColor);
          break;
      }
      setListeningFor(null);
    };

    recognition.onerror = () => {
      alert("Error recognizing speech. Please try again.");
      setListeningFor(null);
    };

    recognition.start();
  };

  const handleGenerate = async () => {
    if (!imageUrl) {
      alert("No logo image to edit.");
      return;
    }

    setIsGenerating(true);
    setShowModal(true);

    try {
      const response = await fetch(imageUrl);
      const logoBlob = await response.blob();

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

  const downloadGeneratedImage = () => {
    if (!generatedImageBlob) return;
    const url = URL.createObjectURL(generatedImageBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited-logo.png";
    link.click();
    URL.revokeObjectURL(url);
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
            <img src={imageUrl} alt="Logo to Edit" className="logo-image" />
          ) : (
            <p>No logo image available. Please go back and generate one.</p>
          )}
        </div>

        <div className="voice-inputs">
        <div className="voice-input-row">
            <label>Logo Name:</label>
            <input type="text" value={logoName} readOnly placeholder="Logo Name" />
            <button
              className="microphone-button"
              onClick={() => startListening("logoName")}
              disabled={listeningFor === "logoName"}
            >
              <FaMicrophone />
            </button>
          </div>
          <div className="voice-input-row">
            <label>Slogan:</label>
            <input type="text" value={slogan} readOnly placeholder="Slogan" />
            <button
              className="microphone-button"
              onClick={() => startListening("slogan")}
              disabled={listeningFor === "slogan"}
            >
              <FaMicrophone />
            </button>
          </div>

          <div className="voice-input-row">
            <label>Background Color:</label>
            <input type="text" value={backgroundColor} readOnly placeholder="Background Color" />
            <button
              className="microphone-button"
              onClick={() => startListening("backgroundColor")}
              disabled={listeningFor === "backgroundColor"}
            >
              <FaMicrophone />
            </button>
          </div>

          <div className="voice-input-row">
            <label>Font Size:</label>
            <input type="text" value={fontSize} readOnly placeholder="Font Size" />
            <button
              className="microphone-button"
              onClick={() => startListening("fontSize")}
              disabled={listeningFor === "fontSize"}
            >
              <FaMicrophone />
            </button>
          </div>

          <div className="voice-input-row">
            <label>Position:</label>
            <input type="text" value={position} readOnly placeholder="Position" />
            <button
              className="microphone-button"
              onClick={() => startListening("position")}
              disabled={listeningFor === "position"}
            >
              <FaMicrophone />
            </button>
          </div>

          <div className="voice-input-row">
            <label>Name Color:</label>
            <input type="text" value={nameColor} readOnly placeholder="Name Color" />
            <button
              className="microphone-button"
              onClick={() => startListening("nameColor")}
              disabled={listeningFor === "nameColor"}
            >
              <FaMicrophone />
            </button>
          </div>

          <div className="voice-input-row">
            <label>Slogan Color:</label>
            <input type="text" value={sloganColor} readOnly placeholder="Slogan Color" />
            <button
              className="microphone-button"
              onClick={() => startListening("sloganColor")}
              disabled={listeningFor === "sloganColor"}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        <button
          className="download-button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
            {isGenerating ? (
              <div className="spinner"></div>
            ) : (
              <>
                {generatedImageBlob && (
                  <>
                    <img
                      src={URL.createObjectURL(generatedImageBlob)}
                      alt="Edited Logo"
                      className="generated-logo-image"
                    />
                    <button onClick={downloadGeneratedImage} className="download-button">
                      Download Edited Logo
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVoiceLogo;