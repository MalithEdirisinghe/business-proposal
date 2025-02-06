import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MissingDetails.css";
import chat from '../assets/chat.png';
import { Document, Page, pdfjs } from "react-pdf";  // Import Document and Page
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Modal from './Modal';
import { jsPDF } from "jspdf";
import "./NotoSansSinhala-normal";
import { PDFDocument } from "pdf-lib";

// Set PDF.js worker source locally
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const translations = {
  English: {
    heading: "Enhance Your Business Proposal: Add Missing Details",
    viewMoreDetails: "View More Details",
    backButton: "Back",
    completeButton: "Complete",
    missingInfoHeading: "Some important details are missing.",
    submitButton: "Submit",
    placeholder: "Enter details for {topic}",
  },
  Sinhala: {
    heading: "ඔබගේ ව්‍යාපාර යෝජනාව සාර්ථකව අඩු විස්තර එක් කරන්න",
    viewMoreDetails: "වැඩි විස්තර බලන්න",
    backButton: "පසුබැසීම",
    completeButton: "අවසන් කරන්න",
    missingInfoHeading: "අවශ්‍ය විස්තර කිහිපයක් අඩුයි.",
    submitButton: "ඉදිරිපත් කරන්න",
    placeholder: "මෙතන {topic} සඳහා විස්තර ඇතුලත් කරන්න",
  },
};

const MissingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { missingInfo, generatedPdfFile, language } = location.state || {
    missingInfo: { topics: [] },
    generatedPdfFile: null
  };

  // Get translations for the selected language
  const content = translations[language] || translations.English;

  const [formData, setFormData] = useState(
    missingInfo.topics.reduce((acc, topic) => ({ ...acc, [topic]: [] }), {})
  );

  const [expandedSections, setExpandedSections] = useState({});
  const [inputValues, setInputValues] = useState(
    missingInfo.topics.reduce((acc, topic) => ({ ...acc, [topic]: "" }), {})
  );

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const fetchSuggestions = async (input) => {
    if (!input || language !== "Sinhala") {
      setSuggestions([]);
      return;
    }

    const words = input.split(" ");
    const lastWord = words[words.length - 1];

    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(lastWord)}&ime=transliteration_en_si&num=5`
      );
      const data = await response.json();
      if (data && data[0] === "SUCCESS" && data[1]?.length > 0) {
        setSuggestions([...data[1][0][1], lastWord]);
        setSelectedSuggestion(data[1][0][1][0]); // Auto-select the first suggestion
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e, topic) => {
    const input = e.target.value;
    setInputValues((prev) => ({
      ...prev,
      [topic]: input,
    }));
    fetchSuggestions(input); // Fetch suggestions based on the updated input
  };

  const handleSuggestionClick = (suggestion, topic) => {
    const words = inputValues[topic].split(" ");
    words[words.length - 1] = suggestion;
    setInputValues((prev) => ({
      ...prev,
      [topic]: words.join(" ") + " ",
    }));
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleKeyDown = (e, topic) => {
    const punctuationKeys = [" ", ".", ",", "?", "!", ";", ":", "/"];
    if (punctuationKeys.includes(e.key) && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[0], topic); // Auto-select the first suggestion
      setInputValues((prev) => ({
        ...prev,
        [topic]: prev[topic].trim() + " ",
      }));
    }
  };

  const handleToggleSection = (topic) => {
    setExpandedSections((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const handleSubmit = (topic) => {
    const text = inputValues[topic].trim();

    if (text === "") {
      alert("Please enter details before submitting.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [topic]: [...prev[topic], text], // Append new input to array
    }));

    setInputValues((prev) => ({
      ...prev,
      [topic]: "",
    }));

    alert(`Details for "${topic}" submitted successfully!`);
  };

  const handleComplete = async () => {
    if (!generatedPdfFile) {
      alert("No base PDF found.");
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(generatedPdfFile);
  
      reader.onload = async function (event) {
        // First translate all form data if language is Sinhala
        const translatedFormData = { ...formData };
        const translatedTopics = {}; // To store translated topics
  
        if (language === "Sinhala") {
          // Translate the topic labels first
          for (const topic in formData) {
            // Translate the topic (like "Company Overview" -> "සමාගම් සාරාංශය")
            try {
              const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=AIzaSyACXDLKVVG-LoFcZgnjllRBYCiDfCWNHzo`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    q: topic,
                    source: "si",
                    target: "en",
                  }),
                }
              );
              
              const data = await response.json();
              translatedTopics[topic] = data.data.translations[0].translatedText;
            } catch (error) {
              console.error("Translation error for topic:", error);
              translatedTopics[topic] = topic; // If translation fails, keep the original topic
            }
          }
  
          // Now translate each entry for each topic
          for (const topic in formData) {
            if (formData[topic].length > 0) {
              const translatedEntries = await Promise.all(
                formData[topic].map(async (entry) => {
                  try {
                    const response = await fetch(
                      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyACXDLKVVG-LoFcZgnjllRBYCiDfCWNHzo`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          q: entry,
                          source: "si", // Sinhala
                          target: "en", // English
                        }),
                      }
                    );
                    
                    const data = await response.json();
                    return data.data.translations[0].translatedText;
                  } catch (error) {
                    console.error("Translation error:", error);
                    return entry; // Return original text if translation fails
                  }
                })
              );
              translatedFormData[topic] = translatedEntries;
            }
          }
        }
  
        // Create a new PDF with the translated missing details
        const doc = new jsPDF();
        doc.setFont("NotoSansSinhala");
  
        let y = 20;
        const margin = 20;
        const lineHeight = 10;
  
        // Add title in both languages if the original was in Sinhala
        doc.setFontSize(16);
        doc.text("Added Missing Details", margin, y);
        y += lineHeight * 2;
  
        // Add content - both original and translated if Sinhala
        for (const topic in formData) {
          if (formData[topic].length > 0) {
            doc.setFontSize(14);
            // If language is Sinhala, use the translated topic name
            const topicName = language === "Sinhala" ? translatedTopics[topic] : topic;
            doc.text(`${topicName}:`, margin, y);  // Add translated topic name
            y += lineHeight;
  
            doc.setFontSize(12);
            formData[topic].forEach((entry, index) => {
              if (y > 270) {
                doc.addPage();
                y = 20;
              }

              // Add translated text if language is Sinhala
              if (language === "Sinhala") {
                doc.text(`${translatedFormData[topic][index]}`, margin + 10, y);
                y += lineHeight;
              }
            });
  
            y += lineHeight / 2;
          }
        }
  
        // Get the PDF with missing details as bytes
        const missingDetailsBytes = doc.output('arraybuffer');
  
        // Load both PDFs
        const existingPdfDoc = await PDFDocument.load(event.target.result);
        const missingDetailsPdfDoc = await PDFDocument.load(missingDetailsBytes);
  
        // Create merged PDF
        const mergedPdfDoc = await PDFDocument.create();
  
        // Copy pages from both PDFs
        const existingPages = await mergedPdfDoc.copyPages(
          existingPdfDoc,
          existingPdfDoc.getPageIndices()
        );
        existingPages.forEach(page => mergedPdfDoc.addPage(page));
  
        const missingDetailsPages = await mergedPdfDoc.copyPages(
          missingDetailsPdfDoc,
          missingDetailsPdfDoc.getPageIndices()
        );
        missingDetailsPages.forEach(page => mergedPdfDoc.addPage(page));
  
        // Save and create final PDF
        const mergedPdfBytes = await mergedPdfDoc.save();
        const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const updatedPdfFile = new File([mergedPdfBlob], "Updated_Business_Proposal.pdf", {
          type: "application/pdf"
        });
        
        // Navigate to next page with updated PDF
        setTimeout(() => {
          navigate("/proposal-form", {
            state: { generatedPdfFile: updatedPdfFile }
          });
        }, 1000);
      };
    } catch (error) {
      console.error("Error updating PDF:", error);
      alert("Failed to update the PDF. Please try again.");
    }
  };
  
  const [isModalVisible, setModalVisible] = useState(false);

  const handleViewMoreDetails = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="missing-details-container">
      <div className="header-section">
        <img src={chat} alt="Chat Icon" className="header-icon" />
        <h2>{content.heading}</h2>
      </div>

      <div className="missing-info-section">
        <div className="missing-topics">
          {missingInfo.topics.length > 0 ? (
            missingInfo.topics.map((topic, index) => (
              <div key={index} className="topic-item">
                <div className="topic-header" onClick={() => handleToggleSection(topic)}>
                  <span>{topic}</span>
                  <span>{expandedSections[topic] ? "▲" : "▼"}</span>
                </div>

                {expandedSections[topic] && (
                  <div className="topic-content">
                    <textarea
                      className="topic-input"
                      name={topic}
                      value={inputValues[topic]}
                      onChange={(e) => handleInputChange(e, topic)}
                      onKeyDown={(e) => handleKeyDown(e, topic)}
                      placeholder={content.placeholder.replace("{topic}", topic)}
                    />
                    <button className="submit-button" onClick={() => handleSubmit(topic)}>
                      {content.submitButton}
                    </button>

                    {formData[topic].length > 0 && (
                      <div className="submitted-responses">
                        <strong>Submitted:</strong>
                        <ul>
                          {formData[topic].map((entry, i) => (
                            <li key={i}>{entry}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {suggestions.length > 0 && (
                      <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                          <li key={index} onClick={() => handleSuggestionClick(suggestion, topic)}>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No missing details required.</p>
          )}
        </div>

        <div className="buttons-group">
          <button className="view-details-button" onClick={handleViewMoreDetails}>
            {content.viewMoreDetails}
          </button>
          <button className="back-button" onClick={() => navigate(-1)}>{content.backButton}</button>
          <button className="complete-button" onClick={handleComplete}>{content.completeButton}</button>
        </div>
      </div>

      <Modal show={isModalVisible} onClose={closeModal} language={language} />

      {generatedPdfFile && (
        <div className="pdf-viewer">
          <h3>Preview of Your Proposal</h3>
          <Document
            file={URL.createObjectURL(generatedPdfFile)}
            onLoadSuccess={({ numPages }) => console.log("PDF Loaded with", numPages, "pages")}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default MissingDetails;