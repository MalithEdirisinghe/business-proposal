import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VoiceRecord.css';
import { BsMic, BsStop } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "./NotoSansSinhala-normal";
import chat from '../assets/chat.png';

const translations = {
  English: {
    heading: 'Tell Us Your Business Idea',
    instructions: 'Press the microphone button to start recording.',
    heading1: "Craft Winning",
    subHeading: "Business Proposals Effortlessly with BizConnect Lanka",
    upload: "Upload and Convert to Text",
    audio: "Recording complete. Play your audio below:",
    submitText: "Submit Edited Text",
    close: "Close",
    missingDetailsHeading: "Some important details are missing.",
    skipAndContinue: "Skip and Continue",
    addMissingDetails: "Add Missing Details",
    missingInfoHeading: "Some important details are missing.",
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
    heading: 'ඔබගේ ව්‍යාපාර සැලැසුම අපට කියන්න',
    instructions: 'වාර්තා කිරීමට මයික්රෝෆෝන් බොත්තම ඔබන්න.',
    heading1: "BizConnect Lanka",
    subHeading: "මගින් ඔබගේ ව්‍යාපාර යෝජනාවන් සාර්ථකව සහ පහසුවෙන් සකස් කරන්න.",
    upload: "උඩුගත කර පෙළට පරිවර්තනය කරන්න",
    audio: "පටිගත කිරීම සම්පූර්ණයි. ඔබගේ ශ්‍රව්‍ය පහතින් වාදනය කරන්න:",
    submitText: "සැකසූ පෙළ ඉදිරිපත් කරන්න",
    close: "වසන්න",
    missingDetailsHeading: "වැදගත් විස්තර අඩුයි.",
    skipAndContinue: "මගහැර ඉදිරියට යන්න",
    missingInfoHeading: "වැදගත් විස්තර අඩුයි.",
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
  },
};

const VoiceRecord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = location.state || {};
  const content = translations[language] || translations.English;
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [missingInfo, setMissingInfo] = useState({ status: "no", topics: [] });
  const [showMissingInfoModal, setShowMissingInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [translateText, setTranslateText] = useState("");

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        const blob = new Blob([event.data], { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);

      // Stop all tracks of the MediaStream to release the microphone
      const tracks = mediaRecorder.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleUploadAndConvert = async () => {
    if (!audioBlob) {
      alert('No audio recorded. Please record audio first.');
      return;
    }
    setIsLoading(true);

    let transcript = '';

    try {
      // Send the base64 audio to your custom Cloud Function
      const cloudFunctionResponse = await fetch('https://us-central1-bizconnect-446515.cloudfunctions.net/function-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioBase64: await blobToBase64(audioBlob),
        }),
      });

      if (!cloudFunctionResponse.ok) {
        const errorDetails = await cloudFunctionResponse.text();
        throw new Error(`Cloud Function Error: ${errorDetails}`);
      }

      // Request to Google Speech-to-Text API
      const googleResponse = await fetch(
        'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyACXDLKVVG-LoFcZgnjllRBYCiDfCWNHzo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            config: {
              encoding: 'FLAC',
              sampleRateHertz: 48000,
              languageCode: language === 'Sinhala' ? 'si-LK' : 'en-US',
            },
            audio: {
              uri: 'gs://bizconnect_lanka1/converted-audios/output.flac',
            },
          }),
        }
      );

      const googleData = await googleResponse.json();

      if (!googleResponse.ok) {
        const errorDetails = JSON.stringify(googleData, null, 2);
        throw new Error(`Google Speech-to-Text Error: ${errorDetails}`);
      }

      transcript = googleData.results?.[0]?.alternatives?.[0]?.transcript || 'Could not transcribe audio.';
      alert(`Transcribed Text: ${transcript}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
      transcript = 'Error converting audio to text.';
    } finally {
      setIsLoading(false);
    }

    setTranscribedText(transcript);
    setEditedText(transcript);
    setShowModal(true);
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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

  const handleSubmitEditedText = async () => {
    if (!editedText.trim()) {
      alert("No text to submit.");
      return;
    }

    try {
      setLoading(true);

      let translatedText = editedText;

      // If the language is Sinhala, translate to English
      if (language === "Sinhala") {
        translatedText = await translateSinhalaToEnglish(editedText); // Translate text to English
      }

      // Step 1: Convert the translated text (or original text if not Sinhala) to PDF
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

      const pdfBlob = doc.output("blob"); // Generate PDF as Blob

      // Step 2: Create FormData object
      const formData = new FormData();
      formData.append("file", new File([pdfBlob], "translated_text.pdf", { type: "application/pdf" }));

      // Step 3: Call API to check missing information
      const response = await fetch("http://127.0.0.1:8000/check-missing-topics/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`API Error: ${errorDetails}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Step 4: Handle response for missing information
      if (result.missing_info === "yes") {
        // If missing info is present, update the state and show modal
        alert(`Missing Topics: ${result.missing_topics.join(", ")}`);

        // Apply translations for Sinhala
        const translatedTopics = result.missing_topics.map(topic => content.missingInfo[topic] || topic);

        setMissingInfo({ status: "yes", topics: translatedTopics }); // Track missing info state with topics
      } else {
        // If no missing info, proceed with the next step
        setMissingInfo({ status: "no", topics: [] });
        alert("No missing information found. Proceeding...");
        navigate("/proposal-generation"); // Navigate to the next page
      }
    } catch (error) {
      console.error("Error uploading to ML:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
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

    const splitText = doc.splitTextToSize(editedText, pageWidth - margin * 2);
    splitText.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("new.pdf")
    const pdfBlob = doc.output("blob"); // Generate PDF as Blob
    const generatedPdfFile = new File([pdfBlob], "generated_proposal.pdf", { type: "application/pdf" });

    // Navigate to ProposalForm with the file in state
    navigate("/proposal-form", { state: { generatedPdfFile } });
  };

  const handleGeneratePDFAndNavigate = () => {
    if (!editedText.trim()) {
      alert("No text available to generate the PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("NotoSansSinhala");
    doc.setFontSize(12);
    const margin = 15;
    const lineHeight = 7;
    let y = margin;
    const pageWidth = doc.internal.pageSize.getWidth();

    const splitText = doc.splitTextToSize(editedText, pageWidth - margin * 2);
    splitText.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save('add.pdf')
    // Convert generated PDF to Blob
    const pdfBlob = doc.output("blob");
    const generatedPdfFile = new File([pdfBlob], "generated_proposal.pdf", { type: "application/pdf" });

    // ✅ Check if PDF is successfully created
    console.log("Generated PDF File:", generatedPdfFile);

    // Navigate to MissingDetails.js with missingInfo and PDF file
    navigate("/missing-details", { state: { missingInfo, generatedPdfFile, language } });
  };

  return (
    <div className="voice-record-container">
      <div className="left-panel">
        <div className="text-section">
          <h2>{content.heading1}</h2>
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
        <h2>{content.heading}</h2>
        <p>{content.instructions}</p>
        <div className="microphone-section">
          <div
            className="microphone-circle"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? (
              <BsStop size={100} className="microphone-icon" />
            ) : (
              <BsMic size={100} className="microphone-icon" />
            )}
          </div>
        </div>
        {audioUrl && (
          <div className="audio-preview">
            <p>{content.audio}</p>
            <audio controls src={audioUrl}></audio>
            <button
              className="upload-button"
              onClick={handleUploadAndConvert}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="spinner" />
              ) : (
                <>
                  <AiOutlineCloudUpload size={20} style={{ marginRight: "18px" }} />
                  {content.upload}
                </>
              )}
            </button>
          </div>
        )}
      </div>
      {/* Modal for Edited Text */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Edit the transcribed text here..."
              className="edit-textarea"
            />
            <button className="upload-button" onClick={handleSubmitEditedText}>
              {loading ? <FaSpinner className="spinner" /> : content.submitText}
            </button>
            <button className="upload-button" onClick={() => setShowModal(false)}>
              {content.close}
            </button>
          </div>
        </div>
      )}
      {/* Modal for Missing Information */}
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
                  try {
                    let generatedPdfFile;

                    // Create PDF from the edited text
                    const doc = new jsPDF();
                    doc.setFont("NotoSansSinhala");
                    doc.setFontSize(12);
                    const margin = 15;
                    const lineHeight = 7;
                    let y = margin;
                    const pageWidth = doc.internal.pageSize.getWidth();

                    // Choose the appropriate text based on language
                    const textToUse = language === "Sinhala" ? translateText : editedText;

                    // Generate PDF content
                    const splitText = doc.splitTextToSize(textToUse, pageWidth - margin * 2);
                    splitText.forEach((line) => {
                      if (y > doc.internal.pageSize.getHeight() - margin) {
                        doc.addPage();
                        y = margin;
                      }
                      doc.text(line, margin, y);
                      y += lineHeight;
                    });

                    // Save the PDF locally if needed
                    doc.save('proposal.pdf');

                    // Create the PDF file object for navigation
                    const pdfBlob = doc.output("blob");
                    generatedPdfFile = new File([pdfBlob], "generated_proposal.pdf", { type: "application/pdf" });

                    // Log for debugging
                    console.log("PDF created successfully:", generatedPdfFile);
                    console.log("Missing info:", missingInfo);
                    console.log("Language:", language);

                    // Navigate to MissingDetails.js with all required data
                    navigate("/missing-details", {
                      state: {
                        missingInfo,
                        generatedPdfFile,
                        language
                      }
                    });
                  } catch (error) {
                    console.error("Error generating PDF:", error);
                    alert("Failed to generate PDF. Please try again.");
                  }
                }}
              >
                {content.addMissingDetails}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VoiceRecord;
