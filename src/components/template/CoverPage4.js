import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { downloadProposal } from "./downloadProposal";
import "./CoverPage4.css";

const CoverPage4 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    companyName: "ABC Corporation",
    preparedBy: "Hannah Morales",
    preparedFor: "Morgan Maxwell",
    date: "2025-01-01",
    address: "123 Main Street, City, Country",
    email: "hannah.morales@example.com",
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
    <div className="cover-page4-container">
      <div className="cover-page4" ref={coverRef}>
        {/* Top Section */}
        <div className="cover-page4-header">
          <div className="cover-page4-logo">
            <p>KEITHSTON & PARTNERS</p>
          </div>
        </div>

        {/* Title Section */}
        <div className="cover-page4-title">
          <h1 className="cover-page4-main-title">BUSINESS PROPOSAL</h1>
          <h2 className="cover-page4-year">2025</h2>
          <p className="cover-page4-company-name">For: {details.companyName}</p>
        </div>

        {/* Prepared Info Section */}
        <div className="cover-page4-info">
          <p className="cover-page4-prepared-by">
            <strong>Prepared by:</strong> {details.preparedBy}
          </p>
          <p className="cover-page4-prepared-for">
            <strong>Prepared for:</strong> {details.preparedFor}
          </p>
          <p className="cover-page4-date">
            <strong>Date:</strong> {details.date}
          </p>
          <p className="cover-page4-address">
            <strong>Address:</strong> {details.address}
          </p>
          <p className="cover-page4-email">
            <strong>Email:</strong> {details.email}
          </p>
        </div>

        {/* Footer Section */}
        <div className="cover-page4-footer">
          <p>www.reallygreatsite.com</p>
        </div>

        {/* Decorative Elements */}
        <div className="cover-page4-decorative-top"></div>
        <div className="cover-page4-decorative-bottom"></div>
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
                Prepared For:
                <input
                  type="text"
                  name="preparedFor"
                  value={details.preparedFor}
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

export default CoverPage4;
