import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { downloadProposal } from "./downloadProposal"; // Reusable API function
import "./CoverPage5.css";

const CoverPage5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    businessFor: "ABC Corporation",
    preparedBy: "Alexander Thompson",
    date: "2025-12-01",
    address: "123 Main Street, City, Country",
    email: "alexander.thompson@example.com",
    presentedTo: "Olivia Thompson",
    presentedBy: "Alexander Thompson",
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
        // Convert the cover page to an image
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
    <div className="cover-page5-container">
      <div className="cover-page5" ref={coverRef}>
        {/* Top Section */}
        <div className="cover-page5-header">
          <h1 className="cover-page5-main-title">BUSINESS PROPOSAL</h1>
          <h2 className="cover-page5-subtitle">December 2025</h2>
        </div>

        {/* Details Section */}
        <div className="cover-page5-details">
          <p>
            <strong>Business Proposal for:</strong> {details.businessFor}
          </p>
          <p>
            <strong>Prepared by:</strong> {details.preparedBy}
          </p>
          <p>
            <strong>Date:</strong> {details.date}
          </p>
          <p>
            <strong>Address:</strong> {details.address}
          </p>
          <p>
            <strong>Email:</strong> {details.email}
          </p>
        </div>

        {/* Footer Section */}
        <div className="cover-page5-footer">
          <p>
            <strong>Presented To:</strong> {details.presentedTo}
          </p>
          <p>
            <strong>Presented By:</strong> {details.presentedBy}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="cover-page5-decorative-top"></div>
        <div className="cover-page5-decorative-bottom"></div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
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
                Business Proposal For:
                <input
                  type="text"
                  name="businessFor"
                  value={details.businessFor}
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
              <label>
                Presented To:
                <input
                  type="text"
                  name="presentedTo"
                  value={details.presentedTo}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Presented By:
                <input
                  type="text"
                  name="presentedBy"
                  value={details.presentedBy}
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

export default CoverPage5;
