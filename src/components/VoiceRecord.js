import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './VoiceRecord.css';
import { BsMic, BsStop } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const translations = {
  English: {
    heading: 'Tell Us Your Business Idea',
    instructions: 'Press the microphone button to start recording.',
    heading1: "Craft Winning",
    subHeading: "Business Proposals Effortlessly with BizConnect Lanka",
    upload: "Upload and Convert to Text",
    audio: "Recording complete. Play your audio below:"
  },
  Sinhala: {
    heading: 'ඔබගේ ව්‍යාපාර සැලැසුම අපට කියන්න',
    instructions: 'වාර්තා කිරීමට මයික්රෝෆෝන් බොත්තම ඔබන්න.',
    heading1: "BizConnect Lanka",
    subHeading: "මගින් ඔබගේ ව්‍යාපාර යෝජනාවන් සාර්ථකව සහ පහසුවෙන් සකස් කරන්න.",
    upload: "උඩුගත කර පෙළට පරිවර්තනය කරන්න",
    audio: "පටිගත කිරීම සම්පූර්ණයි. ඔබගේ ශ්‍රව්‍ය පහතින් වාදනය කරන්න:"
  },
};

const VoiceRecord = () => {
  const location = useLocation();
  const { language } = location.state || {};
  const content = translations[language] || translations.English;

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Edit the transcribed text here..."
              className="edit-textarea"
            />
            <button
              className="upload-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="upload-button"
              onClick={() => alert("Edited Text: " + editedText)}
            >
              Submit Edited Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default VoiceRecord;
