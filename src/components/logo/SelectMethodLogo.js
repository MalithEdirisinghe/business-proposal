import React from "react";
import { useNavigate } from "react-router-dom";

const SelectMethodLogo = () => {
  const navigate = useNavigate();

  const handleTextClick = () => {
    navigate("/text-logo"); // Navigate to the Text Input page
  };

  const handleUploadClick = () => {
    navigate("/upload-image"); // Navigate to the UploadImage page
  };

  return (
    <div className="select-language-container">
      <main className="select-language-content">
        <h2>Transform your vision into a logo</h2>
        <h3>Create Your Logo in Two Simple Ways</h3>
        <p>
          Our platform offers two easy ways to bring your logo idea to life:
        </p>
        <ul>
          <li>
            <b>Input Your Text:</b> You can type a description of your logo, and
            our system will create a logo based on your text input.
          </li>
          <li>
            <b>Upload and Crop an Image:</b> Simply upload an image, crop the
            section you want, and let our system analyze it to generate a custom
            logo for you.
          </li>
        </ul>
        <p>
          Once the logo is generated, you can edit and refine it using voice
          commands, making it quick and easy to customize your design.
        </p>
        <div className="button-container">
          <button className="text-button" onClick={handleTextClick}>
            TEXT
          </button>
          <button className="upload-button" onClick={handleUploadClick}>
            Upload
          </button>
        </div>
      </main>
      {/* Footer */}
      <footers className="select-language-footer"></footers>
    </div>
  );
};

export default SelectMethodLogo;
