import React, { useState, useRef } from "react";
import "./TextRecord.css";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import chat from '../assets/chat.png';
import jsPDF from 'jspdf';
import './NotoSansSinhala-normal';
import { FaSpinner } from "react-icons/fa";

// PDF.js configuration
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min.js');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const translations = {
  English: {
    heading: "Craft Winning",
    subHeading: "Business Proposals Effortlessly with BizConnect Lanka",
    instruction: "Type or upload your text file with your Business Idea",
    placeholder: "Type your business idea here...",
    uploadToML: "Upload to ML",
    missingInfoHeading: "Some important details are missing.",
    skipAndContinue: "Skip and Continue",
    addMissingDetails: "Add Missing Details",
    missingInfo: {
      "Company Overview": "Company Overview",
      "Mission and Vision Statement": "Mission and Vision Statement",
      "Executive Summary": "Executive Summary",
      "Owners and Partnerships": "Owners and Partnerships",
      "Industry Overview and Trends": "Industry Overview and Trends",
      "Competition": "Competition",
      "Problem Statement": "Problem Statement",
      "Marketing Plan": "Marketing Plan",
      "Proposed Solution": "Proposed Solution",
      "Market Analysis": "Market Analysis",
      "Sustainable Practices": "Sustainable Practices",
      "Implementation Timeline": "Implementation Timeline",
      "Staff Names": "Staff Names",
      "Financial Objectives": "Financial Objectives",
      "Exit Strategy": "Exit Strategy",
      "Conclusion": "Conclusion",
    }
  },
  Sinhala: {
    heading: "BizConnect Lanka",
    subHeading: "මගින් ඔබගේ ව්‍යාපාර යෝජනාවන් සාර්ථකව සහ පහසුවෙන් සකස් කරන්න.",
    instruction: "ඔබේ ව්‍යාපාර සංකල්පය සහිත ගොනුව ලිපියක් ටයිප් කරන්න හෝ upload කරන්න",
    placeholder: "ඔබේ ව්‍යාපාර යෝජනාව මෙතන ටයිප් කරන්න...",
    uploadToML: "ML වෙත උඩුගත කරන්න",
    missingInfoHeading: "වැදගත් විස්තර අඩුයි.",
    skipAndContinue: "මගහැර ඉදිරියට යන්න",
    addMissingDetails: "අඩු විස්තර එකතු කරන්න",
    missingInfo: {
      "Company Overview": "සමාගම් සාරාංශය",
      "Mission and Vision Statement": "ධාමික සහ දැක්ම පණිවිඩය",
      "Executive Summary": "ක්‍රියාදාම සාරාංශය",
      "Owners and Partnerships": "අයිතිකරුවන් සහ හවුල්කාරිත්වයන්",
      "Industry Overview and Trends": "කර්මාන්ත සාරාංශය සහ ප්‍රවණතා",
      "Competition": "මෙහෙයුම්",
      "Problem Statement": "සමස්ථානය පණිවිඩය",
      "Marketing Plan": "ප්‍රචාරණ සැලැස්ම",
      "Proposed Solution": "පෙරළිකාරක විසඳුම",
      "Market Analysis": "වෙළඳපොළ විශ්ලේෂණය",
      "Sustainable Practices": "සස්ථාවන් සහ ප්‍රතිවෙනස් මාර්ග",
      "Implementation Timeline": "ක්‍රියාත්මක කිරීමේ කාලය",
      "Staff Names": "කාර්ය මණ්ඩලයේ නාමයන්",
      "Financial Objectives": "මුදල් ආරක්ෂණ ආරම්භය",
      "Exit Strategy": "ප්‍රතික්‍රියා අවසන් ක්‍රම",
      "Conclusion": "නිගමනය"
    }
  }
};

const TextRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = location.state || {};
  const content = translations[language] || translations.English;

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [missingInfo, setMissingInfo] = useState({ status: "no", topics: [] });
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [translateText, setTranslateText] = useState("");

  const fetchSuggestions = async (input) => {
    if (!input || language !== "Sinhala") {
      setSuggestions([]);
      return;
    }

    const words = input.split(" ");
    const lastWord = words[words.length - 1];

    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(
          lastWord
        )}&ime=transliteration_en_si&num=5`
      );
      const data = await response.json();
      if (data && data[0] === "SUCCESS" && data[1]?.length > 0) {
        setSuggestions([...data[1][0][1], lastWord]);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setText(input);
    fetchSuggestions(input);
  };

  const handleSuggestionClick = (suggestion) => {
    const words = text.split(" ");
    words[words.length - 1] = suggestion;
    setText(words.join(" ") + " ");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    const punctuationKeys = [" ", ".", ",", "?", "!", ";", ":", "/"];
    if (punctuationKeys.includes(e.key) && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[0]);
      setText((prevText) => prevText.trim() + e.key);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setPdfData(file);
        setPdfName(file.name);
        setText(`[PDF Added: ${file.name}]`);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleUploadToML = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (pdfData) {
        if (language === "Sinhala") {
          try {
            // Read the PDF file
            const reader = new FileReader();
            const pdfText = await new Promise((resolve, reject) => {
              reader.onload = async (event) => {
                try {
                  console.log("PDF loaded, starting text extraction...");
                  const typedArray = new Uint8Array(event.target.result);

                  // Load the PDF document
                  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                  console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);

                  let fullText = '';

                  // Extract text from each page
                  for (let i = 1; i <= pdf.numPages; i++) {
                    console.log(`Processing page ${i}...`);
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const text = content.items.map(item => item.str).join(' ');
                    fullText += text + ' ';
                  }

                  console.log("Text extraction completed");
                  console.log("Extracted text:", fullText);
                  resolve(fullText);
                } catch (error) {
                  console.error("Error in PDF processing:", error);
                  reject(error);
                }
              };
              reader.onerror = (error) => {
                console.error("Error reading file:", error);
                reject(error);
              };
              reader.readAsArrayBuffer(pdfData);
            });

            console.log("Starting translation...");
            const translatedText = await translateSinhalaToEnglish(pdfText);
            console.log("Translation completed:", translatedText);

            // Create new PDF with translated text
            const doc = new jsPDF();
            doc.setFont("NotoSansSinhala");
            doc.setFontSize(12);
            const margin = 15;
            const lineHeight = 7;
            let y = margin;
            const pageWidth = doc.internal.pageSize.getWidth();

            const splitText = doc.splitTextToSize(translatedText, pageWidth - margin * 2);
            splitText.forEach((line) => {
              if (y > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(line, margin, y);
              y += lineHeight;
            });

            const pdfBlob = doc.output("blob");
            formData.append("file", new File([pdfBlob], "translated_proposal.pdf", { type: "application/pdf" }));
          } catch (error) {
            console.error("Error processing Sinhala PDF:", error);
            throw new Error("Failed to process Sinhala PDF: " + error.message);
          }
        } else {
          // If language is English, use the original PDF
          formData.append("file", pdfData);
        }
      } else if (text.trim()) {
        // If text is entered, convert to PDF
        let translatedText = text;
        if (language === "Sinhala") {
          translatedText = await translateSinhalaToEnglish(text);
        }

        const doc = new jsPDF();
        doc.setFont("NotoSansSinhala");
        doc.setFontSize(12);
        const margin = 15;
        const lineHeight = 7;
        let y = margin;
        const pageWidth = doc.internal.pageSize.getWidth();

        const splitText = doc.splitTextToSize(translatedText, pageWidth - margin * 2);
        splitText.forEach((line) => {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        });

        const pdfBlob = doc.output("blob");
        formData.append("file", new File([pdfBlob], "translated_text.pdf", { type: "application/pdf" }));
      } else {
        alert("Please enter text or upload a PDF file.");
        setLoading(false);
        return;
      }

      console.log("Sending to backend...");
      const response = await fetch("http://127.0.0.1:8000/check-missing-topics/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error(`API Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.missing_info === "yes") {
        const translatedTopics = result.missing_topics.map(topic => content.missingInfo[topic] || topic);
        setMissingInfo({ status: "yes", topics: translatedTopics });
      } else {
        setMissingInfo({ status: "no", topics: [] });
        navigate("/proposal-generation");
      }

    } catch (error) {
      console.error("Error in handleUploadToML:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Translate Sinhala text to English using Google Translate API
  const translateSinhalaToEnglish = async (text) => {
    try {
      // Fetch translation from Google Translate API
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyACXDLKVVG-LoFcZgnjllRBYCiDfCWNHzo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: "si", // Sinhala source language
          target: "en", // English target language
        })
      });

      const data = await response.json();
      if (data.data && data.data.translations) {
        // alert('Translated Text: ' + data.data.translations[0].translatedText);
        setTranslateText(data.data.translations[0].translatedText);
        return data.data.translations[0].translatedText;
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Translation Error:", error);
      return text; // Return original text if translation fails
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSkipAndContinue = () => {
    // Create a File object from the generated PDF Blob
    const doc = new jsPDF();
    doc.setFont("NotoSansSinhala");
    doc.setFontSize(12);
    const margin = 15;
    const lineHeight = 7;
    let y = margin;
    const pageWidth = doc.internal.pageSize.getWidth();

    const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);
    splitText.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    const pdfBlob = doc.output("blob"); // Generate PDF as Blob
    const generatedPdfFile = new File([pdfBlob], "generated_proposal.pdf", { type: "application/pdf" });

    // Navigate to ProposalForm with the file in state
    navigate("/proposal-form", { state: { generatedPdfFile } });
  };


  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Configure Sinhala font
    doc.setFont('NotoSansSinhala');
    doc.setFontSize(12);

    // PDF configuration
    const margin = 15;
    const lineHeight = 7;
    let y = margin;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Split text into array of Sinhala lines
    const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);

    // Add lines to PDF
    splitText.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(line, margin, y, { lang: 'si' });
      y += lineHeight;
    });

    doc.save('business_proposal_si.pdf');
  };

  return (
    <div className="text-record-container">
      <div className="left-panel">
        <div className="text-section">
          <h2>{content.heading}</h2>
          <h2>{content.subHeading}</h2>
        </div>
        <div className="dots-section">
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot blue"></span>
          <span className="dot red"></span>
        </div>
      </div>
      <div className="right-panel">
        <h2>{content.instruction}</h2>
        <div className="text-area-container">
          <textarea
            className="text-area"
            placeholder={content.placeholder}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={!!pdfName}
          ></textarea>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className="action-buttons">
            <button className="icon-button" onClick={handleUploadClick}>
              <BsUpload />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <button onClick={handleGeneratePDF}>Generate PDF</button>

          </div>
        </div>
        {pdfName && (
          <div className="pdf-file-info">
            <AiOutlineFilePdf size={24} style={{ marginRight: "8px" }} />
            <span>{pdfName}</span>
          </div>
        )}
        <button className="upload-to-ml-button" onClick={handleUploadToML} disabled={loading}>
          {loading ? <FaSpinner className="spinner" /> : content.uploadToML}
        </button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>

      {missingInfo?.status === "yes" && (
        <div className="missing-info-container">
          <div className="missing-info-card">
            <div className="missing-info-header">
              <img
                src={chat} // Replace with your icon's URL
                alt="Info Icon"
                className="missing-info-icon"
              />
              <h3>{content.missingInfoHeading}</h3>
            </div>
            {language === "Sinhala" ? (
              <>
                <p>
                  වැදගත් විස්තර අඩුයි, එය ඔබගේ ව්‍යාපාර යෝජනාවේ ගුණාත්මකභාවය සහ
                  කාර්යක්ෂමතාව වැඩි දියුණු කිරීමට උපකාරී විය හැක.
                </p>
                <ul>
                  {missingInfo?.topics?.length > 0 && missingInfo.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>
                  Some important details are missing, which could enhance the quality and
                  effectiveness of your business proposal.
                </p>
                <ul>
                  {missingInfo?.topics?.length > 0 && missingInfo.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="missing-info-actions">
              <button
                className="skip-button"
                onClick={handleSkipAndContinue}
              >
                {content.skipAndContinue}
              </button>
              <button
                className="add-details-button"
                onClick={async () => {
                  let generatedPdfFile;

                  try {
                    if (pdfData) {
                      if (language === "Sinhala") {
                        // Extract text from PDF
                        const reader = new FileReader();
                        const pdfText = await new Promise((resolve, reject) => {
                          reader.onload = async (event) => {
                            try {
                              const typedArray = new Uint8Array(event.target.result);
                              const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                              let fullText = '';

                              for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const content = await page.getTextContent();
                                const text = content.items.map(item => item.str).join(' ');
                                fullText += text + ' ';
                              }
                              resolve(fullText);
                            } catch (error) {
                              reject(error);
                            }
                          };
                          reader.readAsArrayBuffer(pdfData);
                        });

                        // Translate the extracted text
                        const translatedText = await translateSinhalaToEnglish(pdfText);

                        // Create new PDF with translated text
                        const doc = new jsPDF();
                        doc.setFont("NotoSansSinhala");
                        doc.setFontSize(12);
                        const margin = 15;
                        const lineHeight = 7;
                        let y = margin;
                        const pageWidth = doc.internal.pageSize.getWidth();

                        const splitText = doc.splitTextToSize(translatedText, pageWidth - margin * 2);
                        splitText.forEach((line) => {
                          if (y > doc.internal.pageSize.getHeight() - margin) {
                            doc.addPage();
                            y = margin;
                          }
                          doc.text(line, margin, y);
                          y += lineHeight;
                        });

                        // Save the translated PDF
                        doc.save("translated_proposal.pdf");
                        const pdfBlob = doc.output("blob");
                        generatedPdfFile = new File([pdfBlob], "translated_proposal.pdf", { type: "application/pdf" });
                      } else {
                        // If English, use original PDF
                        const url = URL.createObjectURL(pdfData);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'save.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);

                        generatedPdfFile = pdfData;
                      }
                    } else {
                      // Generate PDF from text
                      const doc = new jsPDF();
                      doc.setFont("NotoSansSinhala");
                      doc.setFontSize(12);
                      const margin = 15;
                      const lineHeight = 7;
                      let y = margin;
                      const pageWidth = doc.internal.pageSize.getWidth();

                      const splitText = doc.splitTextToSize(translateText, pageWidth - margin * 2);
                      splitText.forEach((line) => {
                        if (y > doc.internal.pageSize.getHeight() - margin) {
                          doc.addPage();
                          y = margin;
                        }
                        doc.text(line, margin, y);
                        y += lineHeight;
                      });
                      doc.save("save.pdf");
                      const pdfBlob = doc.output("blob");
                      generatedPdfFile = new File([pdfBlob], "generated_proposal.pdf", { type: "application/pdf" });
                    }

                    navigate("/missing-details", {
                      state: {
                        missingInfo,
                        generatedPdfFile,
                        language
                      }
                    });
                  } catch (error) {
                    console.error("Error processing PDF:", error);
                    alert("Failed to process the PDF. Please try again.");
                  }
                }}
              >
                {content.addMissingDetails}
              </button>
            </div>
          </div>
        </div>
      )}
      {pdfData && (
        <div className="pdf-viewer">
          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            error={null}  // This will hide the error message
          >
            {Array.from(new Array(numPages), (index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default TextRecord;
