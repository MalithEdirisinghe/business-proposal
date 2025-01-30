import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/ProposalForm.css";

const ProposalForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessDomain, setBusinessDomain] = useState("");
  const [isExisting, setIsExisting] = useState("Yes");
  const [userInstructions, setUserInstructions] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Template 1");
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  const { generatedPdfFile } = location.state || {}; // Get the generated file from state
  const navigate = useNavigate();

  useEffect(() => {
    if (!generatedPdfFile) {
      alert("No generated file provided!");
      navigate("/"); // Redirect the user if no file is provided
    }
  }, [generatedPdfFile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!businessName || !businessDomain || !userInstructions) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", generatedPdfFile); // Use the passed generated file
    formData.append("business_name", businessName);
    formData.append("business_domain", businessDomain);
    formData.append("is_existing", isExisting);
    formData.append("user_instructions", userInstructions);
    formData.append("selected_template", selectedTemplate);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-proposal/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Navigate to CoverTemplateGenerator.js with the response data
      navigate("/cover-template-generator", { state: { headings: data.headings } });

      setResponseMessage("Proposal generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to generate the proposal. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Enter Details for Proposal</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <p className="file-name">
            Using Generated File: {generatedPdfFile?.name || "Generated Proposal"}
          </p>
        </div>

        <div className="form-group">
          <label>Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="form-group">
          <label>Business Domain:</label>
          <input
            type="text"
            value={businessDomain}
            onChange={(e) => setBusinessDomain(e.target.value)}
            placeholder="Enter business domain"
            required
          />
        </div>

        <div className="form-group">
          <label>Is this an existing business?</label>
          <select
            value={isExisting}
            onChange={(e) => setIsExisting(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>User Instructions:</label>
          <textarea
            value={userInstructions}
            onChange={(e) => setUserInstructions(e.target.value)}
            placeholder="Enter instructions for the proposal"
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Select Template:</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="Template 1">Template 1</option>
            <option value="Template 2">Template 2</option>
            <option value="Template 3">Template 3</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Generate
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default ProposalForm;
