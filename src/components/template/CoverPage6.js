import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./CoverPage6.css";
import { downloadProposal } from "./downloadProposal";

const CoverPage6 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [details, setDetails] = useState({
        businessName: "Arowwai Industries",
        year: "2025",
        proposalTitle: "BUSINESS PROPOSAL",
        preparedBy: "Noah Schumacher",
        preparedFor: "Muhammad Patel",
        phone: "123-456-7890",
        email: "hello@reallygreatsite.com",
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
        <div className="cover-page6-container">
            <div className="cover-page6" ref={coverRef}>
                {/* Header Section */}
                <div className="cover-page6-header">
                    <h2 className="cover-page6-company-name">{details.businessName}</h2>
                </div>

                {/* Title Section */}
                <div className="cover-page6-title">
                    <h1 className="cover-page6-year">{details.year}</h1>
                    <h1 className="cover-page6-proposal-title">{details.proposalTitle}</h1>
                </div>

                {/* Prepared Info Section */}
                <div className="cover-page6-info">
                    <p className="cover-page6-prepared-by">
                        <strong>Prepared by:</strong> {details.preparedBy}
                    </p>
                    <p className="cover-page6-prepared-for">
                        <strong>Prepared for:</strong> {details.preparedFor}
                    </p>
                </div>

                {/* Contact Info Section */}
                <div className="cover-page6-contact">
                    <p>{details.phone}</p>
                    <p>{details.email}</p>
                    <p>{details.address}</p>
                </div>

                {/* Bottom Decorative Section */}
                <div className="cover-page6-bottom-decoration"></div>
                <div className="cover-page6-bottom-triangle"></div>
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
                                Business Name:
                                <input type="text" name="businessName" value={details.businessName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Year:
                                <input type="text" name="year" value={details.year} onChange={handleInputChange} />
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
                                Prepared For:
                                <input type="text" name="preparedFor" value={details.preparedFor} onChange={handleInputChange} />
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

export default CoverPage6;
