import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./CoverPage8.css";
import { downloadProposal } from "./downloadProposal";

const CoverPage8 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [details, setDetails] = useState({
        reportTitle: "BUSINESS PROPOSAL",
        companyName: "ABC Corporation",
        preparedBy: "John Doe",
        reportDate: "January 2025",
        address: "123 Business St, City, Country",
        email: "john.doe@example.com",
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
        <div className="cover-page8-container">
            <div className="cover-page8" ref={coverRef}>
                {/* Background Overlays */}
                <div className="cover-page8-overlay"></div>
                <div className="cover-page8-diagonal"></div>

                {/* Title Section */}
                <div className="cover-page8-title">
                    <h1 className="cover-page8-report-title">{details.reportTitle}</h1>
                    <p className="cover-page8-company-name">For: {details.companyName}</p>
                </div>

                {/* Business Proposal Details */}
                <div className="cover-page8-details">
                    <p>
                        <strong>Prepared by:</strong> {details.preparedBy}
                    </p>
                    <p>
                        <strong>Date:</strong> {details.reportDate}
                    </p>
                    <p>
                        <strong>Address:</strong> {details.address}
                    </p>
                    <p>
                        <strong>Email:</strong> {details.email}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="cover-page8-footer">
                    <p>{details.reportDate}</p>
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
                                Business Proposal For:
                                <input type="text" name="companyName" value={details.companyName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Prepared By:
                                <input type="text" name="preparedBy" value={details.preparedBy} onChange={handleInputChange} />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="reportDate"
                                    value={details.reportDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Address:
                                <input type="text" name="address" value={details.address} onChange={handleInputChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={details.email} onChange={handleInputChange} />
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

export default CoverPage8;
