import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./CoverPage1.css";
import { downloadProposal } from "./downloadProposal";

const CoverPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    businessName: "ABC Corporation",
    authorName: "Anna Katrina",
    date: "2025-01-01",
    address: "123 Anywhere St., Any City",
    email: "anna.katrina@example.com",
    phone: "+123-456-7890",
    website: "www.reallygreatsite.com",
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

  const handleCaptureAndDownload = async () => {
    if (coverRef.current) {
      try {
        // Capture the cover page as an image
        const canvas = await html2canvas(coverRef.current);
        const imageBlob = await new Promise((resolve) => 
          canvas.toBlob(resolve, "image/png")
        );

        // Pass the image to the common API function
        await downloadProposal(imageBlob);
      } catch (error) {
        console.error("Error capturing cover page:", error);
      }
    }
  };

  return (
    <div className="cover-page-container">
      <div className="cover-page" ref={coverRef}>
        {/* Logo Section */}
        <div className="logo-section">
          <div className="blue-gradient1"></div>
          <div className="dot-pattern1"></div>
        </div>

        {/* Title Section */}
        <div className="title-section1">
          <h1 className="project-title1">BUSINESS PROPOSAL</h1>
          <p className="business-name">For: {details.businessName}</p>
          <p className="prepared-by">
            Prepared By: <span className="author-name">{details.authorName}</span>
          </p>
          <p className="proposal-date">
            Date: <span className="date">{details.date}</span>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="blue-gradient"></div>
          <div className="dot-pattern"></div>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info">
          <p>Address: {details.address}</p>
          <p>Email: {details.email}</p>
          <p>Phone: {details.phone}</p>
          <p>Website: {details.website}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          Edit Cover
        </button>
        <button className="use-template-button" onClick={handleCaptureAndDownload}>
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
                Business Name:
                <input
                  type="text"
                  name="businessName"
                  value={details.businessName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Author Name:
                <input
                  type="text"
                  name="authorName"
                  value={details.authorName}
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
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={details.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Website:
                <input
                  type="text"
                  name="website"
                  value={details.website}
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

export default CoverPage;
