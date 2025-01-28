import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./CoverPage7.css";
import { downloadProposal } from "./downloadProposal";

const CoverPage7 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    companyName: "Aldenaire & Partners",
    proposalTitle: "Business Proposal",
    preparedBy: "Olivia Wilson",
    presentedTo: "Sacha Dubois",
    phone: "+123-456-7890",
    email: "aldenaire@gmail.com",
    address: "123 Anywhere St., Any City",
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
        const canvas = await html2canvas(coverRef.current);
        const imageBlob = await new Promise((resolve) => 
          canvas.toBlob(resolve, "image/png")
        );
        await downloadProposal(imageBlob);
      } catch (error) {
        console.error("Error capturing cover page:", error);
      }
    }
  };

  return (
    <div className="cover-page7-container">
      <div className="cover-page7" ref={coverRef}>
        {/* Header */}
        <div className="cover-page7-header">
          <h2 className="cover-page7-company">{details.companyName}</h2>
        </div>

        {/* Title Section */}
        <div className="cover-page7-title">
          <h1 className="cover-page7-proposal-title">{details.proposalTitle}</h1>
        </div>

        {/* Decorative Elements */}
        <div className="cover-page7-decorative">
          <div className="cover-page7-pattern-left"></div>
          <div className="cover-page7-pattern-right"></div>
        </div>

        {/* Prepared Info Section */}
        <div className="cover-page7-info">
          <p className="cover-page7-prepared-by">
            <strong>Prepared by:</strong> <span className="highlight">{details.preparedBy}</span>
          </p>
          <p className="cover-page7-presented-to">
            <strong>Presented to:</strong> <span className="highlight">{details.presentedTo}</span>
          </p>
          <div className="cover-page7-contact">
            <p>📞 {details.phone}</p>
            <p>📍 {details.address}</p>
            <p>🌐 {details.email}</p>
          </div>
        </div>
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
                Company Name:
                <input type="text" name="companyName" value={details.companyName} onChange={handleInputChange} />
              </label>
              <label>
                Proposal Title:
                <input type="text" name="proposalTitle" value={details.proposalTitle} onChange={handleInputChange} />
              </label>
              <label>
                Prepared By:
                <input type="text" name="preparedBy" value={details.preparedBy} onChange={handleInputChange} />
              </label>
              <label>
                Presented To:
                <input type="text" name="presentedTo" value={details.presentedTo} onChange={handleInputChange} />
              </label>
              <label>
                Phone:
                <input type="text" name="phone" value={details.phone} onChange={handleInputChange} />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={details.email} onChange={handleInputChange} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={details.address} onChange={handleInputChange} />
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

export default CoverPage7;
