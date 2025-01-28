import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { downloadProposal } from "./downloadProposal";
import "./CoverPage2.css";

const CoverPage2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    companyName: "BORCELLE",
    businessName: "ABC Corporation",
    date: "2021-05-02",
    preparedBy: "John Doe",
    address: "123 Main St, Anytown",
    email: "john.doe@example.com",
    preparedFor: "Daniel Gallego",
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
    <div className="cover-page2-container">
      <div className="cover-page2" ref={coverRef}>
        {/* Top Section */}
        <div className="top-section">
          <p className="company-name">{details.companyName}</p>
        </div>

        {/* Diagonal Sections */}
        <div className="diagonal-section">
          <div className="diagonal dark"></div>
          <div className="diagonal light"></div>
          <div className="diagonal white"></div>
        </div>

        {/* Title Section */}
        <div className="title-section">
          <p className="date">Date: {details.date}</p>
          <h1 className="main-title">Business Proposal</h1>
          <p className="proposal-for">For: {details.businessName}</p>
        </div>

        {/* Prepared Info Section */}
        <div className="prepared-info-section">
          <p className="prepared-by">Prepared By: <span>{details.preparedBy}</span></p>
          <p className="prepared-address">Address: {details.address}</p>
          <p className="prepared-email">Email: {details.email}</p>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <p className="prepared-for-title">PREPARED FOR:</p>
          <p className="prepared-for-name">{details.preparedFor}</p>
        </div>
      </div>

      {/* Buttons */}
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
                <input
                  type="text"
                  name="companyName"
                  value={details.companyName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Business Name:
                <input
                  type="text"
                  name="businessName"
                  value={details.businessName}
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
                Prepared By:
                <input
                  type="text"
                  name="preparedBy"
                  value={details.preparedBy}
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
                Prepared For:
                <input
                  type="text"
                  name="preparedFor"
                  value={details.preparedFor}
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

export default CoverPage2;
