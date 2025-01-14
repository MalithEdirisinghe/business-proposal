import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./TextLogo.css";

const TextLogo = () => {
  const [logoDescription, setLogoDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleGenerateLogo = async () => {
    if (!logoDescription) {
      alert("Please type your logo description");
      return;
    }

    setIsGenerating(true);
    setShowModal(true);

    try {
      const text = logoDescription;
      const formData = new FormData();
      formData.append("caption", text);

      const apiResponse = await fetch(
        "http://127.0.0.1:5000/generate-logo-text",
        {
          method: "POST",
          body: formData,
        }
      );

      if (apiResponse.ok) {
        const blobResponse = await apiResponse.blob();
        setGeneratedImageBlob(blobResponse);
      } else {
        const errorText = await apiResponse.text();
        alert(`Failed to generate the logo: ${errorText}`);
        setShowModal(false);
      }
    } catch (error) {
      console.log("Error", error);
      alert("An error occurred while generating the logo.");
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
    link.download = "generated-logo.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    if (generatedImageBlob) {
      const imageUrl = URL.createObjectURL(generatedImageBlob);
      navigate("/edit-text-logo", { state: { imageUrl } });
    }
  };

  return (
    <div className="text-logo-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="branding">
          <h1>BizConnect Lanka</h1>
        </div>
        <div className="instruction">
          <h2>Describe Your Logo</h2>
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
        <h2>Create Your Logo with Text</h2>
        <form className="text-logo-form">
          <label>
            Enter Your Logo Description:
            <textarea
              value={logoDescription}
              onChange={(e) => setLogoDescription(e.target.value)}
              placeholder="Type the text for your logo"
            />
          </label>

          <button
            type="button"
            className="generate-logo-button"
            onClick={handleGenerateLogo}
          >
            Generate Logo
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes
              className="close-icon"
              onClick={() => setShowModal(false)}
            />
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
                    alt="Generated Logo"
                    className="generated-logo-image"
                  />
                )}
                <div className="modal-buttons">
                  <button onClick={downloadGeneratedImage}>Download</button>
                  <button onClick={handleEdit}>Edit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextLogo;
