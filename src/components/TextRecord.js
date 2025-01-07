import React, { useState, useRef } from "react";
import "./TextRecord.css";
import { BsUpload } from "react-icons/bs";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import chat from '../assets/chat.png';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  },
};

const TextRecord = () => {
  const location = useLocation();
  const { language } = location.state || {};
  const content = translations[language] || translations.English;

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [missingInfo, setMissingInfo] = useState(null); // Track if "Missing info" is present
  const fileInputRef = useRef(null);

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
        const reader = new FileReader();
        reader.onload = (event) => {
          setPdfData(new Uint8Array(event.target.result));
        };
        reader.readAsArrayBuffer(file);

        setPdfName(file.name); // Save the file name
        setText(`[PDF Added: ${file.name}]`);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleUploadToML = async () => {
    try {
      const payload = pdfData
        ? { pdfName, pdfData: Array.from(pdfData) } // Simulate API payload for PDF
        : { text }; // Payload for typed text

      // Simulate API call to mock ML endpoint
      const response = await fetch("https://dummyjson.com/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Cloud Function Error: ${errorDetails}`);
      }

      const result = await response.json();
      console.log("Response:", result);

      // Check if "missing info" is present
      const missingInfoStatus = Math.random() > 0.5 ? "Yes" : "No"; // Simulated response
      setMissingInfo(missingInfoStatus);
      setUploadStatus(`Upload successful! Missing Info: ${missingInfoStatus}`);
    } catch (error) {
      console.error("Error uploading to ML:", error);
      setUploadStatus("Upload failed. Please try again.");
      alert("Upload failed. Please try again.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
          </div>
        </div>
        {pdfName && (
          <div className="pdf-file-info">
            <AiOutlineFilePdf size={24} style={{ marginRight: "8px" }} />
            <span>{pdfName}</span>
          </div>
        )}
        <button className="upload-to-ml-button" onClick={handleUploadToML}>
          {content.uploadToML}
        </button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>

      {missingInfo === "Yes" && (
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
                  <li>
                    <strong>මගහැර ඉදිරියට යන්න</strong> වඩාත් අඩු විස්තර ලබා නොදී
                    විකල්පයක් තෝරාගෙන යෝජනාව පවත්වාගෙන යාමට ඔබට තේරිය හැක.
                  </li>
                  <li>
                    <strong>අඩු විස්තර එකතු කරන්න</strong> විකල්පය තෝරාගනිමින්, ඔබේ
                    යෝජනාව කාර්යක්ෂම සහ වඩාත් බලපෑම්කාරී වන පරිදි අත්‍යවශ්‍ය විස්තර
                    එක් කළ හැක.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  Some important details are missing, which could enhance the quality and
                  effectiveness of your business proposal.
                </p>
                <ul>
                  <li>
                    You can choose to <strong>Skip and Continue</strong> without providing
                    the missing information and proceed with the proposal in its current
                    form.
                  </li>
                  <li>
                    Or, you can select <strong>Add Missing Details</strong> to include the
                    necessary information, ensuring your proposal is more comprehensive
                    and impactful.
                  </li>
                </ul>
              </>
            )}
            <div className="missing-info-actions">
              <button
                className="skip-button"
                onClick={() => setMissingInfo(null)}
              >
                {content.skipAndContinue}
              </button>
              <button
                className="add-details-button"
                onClick={() => alert("Redirecting to Add Missing Details...")}
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
