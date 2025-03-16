import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { downloadProposal } from "./downloadProposal"; // Reusable API function
import "./CoverPage3.css";

const CoverPage3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    companyName: "ABC Corporation",
    preparedBy: "Olivia Wilson",
    date: "2025-01-01",
    address: "123 Business Lane, Cityville, State, 12345",
    email: "olivia.wilson@abc.com",
  });

  const coverRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleUseTemplate = async () => {
    if (coverRef.current) {
      try {
        // Convert cover page to image
        const canvas = await html2canvas(coverRef.current);
        const imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );

        // Send the captured image to the backend
        await downloadProposal(imageBlob);
      } catch (error) {
        console.error("Error capturing cover page:", error);
      }
    }
  };

  return (
    <div className="cover-page3-wrapper">
      <div className="cover-page3-container" ref={coverRef}>
        {/* Decorative Background */}
        <div className="cover-page3-decorative"></div>

        {/* Title Section */}
        <div className="cover-page3-title">
          <h1 className="cover-page3-main-title">BUSINESS</h1>
          <h2 className="cover-page3-sub-title">PROPOSAL</h2>
          <p className="cover-page3-company-name">For: {details.companyName}</p>
        </div>

        {/* Prepared Info Section */}
        <div className="cover-page3-info">
          <p className="cover-page3-prepared-by">
            <strong>Prepared by:</strong> {details.preparedBy}
          </p>
          <p className="cover-page3-date">
            <strong>Date:</strong> {details.date}
          </p>
          <p className="cover-page3-address">
            <strong>Address:</strong> {details.address}
          </p>
          <p className="cover-page3-email">
            <strong>Email:</strong> {details.email}
          </p>
        </div>
      </div>
        {/* Buttons Section */}
        <div className="buttons-section1">
          <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            Edit Cover
          </button>
          <button className="use-template-button" onClick={handleUseTemplate}>
            Use this Template
          </button>
        </div>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Cover Details</h2>
            <form>
              <label>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={details.companyName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Prepared By:
                <input
                  type="text"
                  name="preparedBy"
                  value={details.preparedBy}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={details.date}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={details.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleSave} className="save-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverPage3;
