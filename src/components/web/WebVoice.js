import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./WebVoice.css";
import LoadingModal from "./LoadingModal";

// Template 1 configuration
const template1 = {
    endpoint: "http://127.0.0.1:5000/generate_template_1_website",
    data: {
        logo_url: "",
        description: "",
        website_name: "",
        home_image_url: "",
        home_description: "",
        home_paragraphs: "",
        home_images: "",
        services: [],
        about_description: "",
        mission: "",
        vision: ""
    }
};

const WebVoice = () => {
    const [formData, setFormData] = useState(template1.data);
    const [isListening, setIsListening] = useState(false);
    const [editableField, setEditableField] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // For microphone processing
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission
    const [processingField, setProcessingField] = useState(null);
    const mediaRecorder = useRef(null);
    const chunksRef = useRef([]);

    // Convert audio Blob to base64 string
    const blobToBase64 = (audioBlob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(audioBlob);
        });
    };

    const processAudio = async (audioBlob, field) => {
        try {
            setIsLoading(true);
            setProcessingField(field);
            console.log("Processing audio for field:", field);
            
            const base64Audio = await blobToBase64(audioBlob);
            console.log("Audio converted to base64");
            
            // Upload to cloud storage
            console.log("Uploading to cloud storage...");
            const cloudFunctionResponse = await fetch('https://us-central1-bizconnect-446515.cloudfunctions.net/function-1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audioBase64: base64Audio }),
            });

            if (!cloudFunctionResponse.ok) {
                throw new Error(`Cloud Function Error: ${await cloudFunctionResponse.text()}`);
            }
            console.log("Audio uploaded to cloud storage successfully");

            // Wait for a short time to ensure the file is processed
            console.log("Waiting for processing...");
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Get transcription
            const cloudStorageUri = 'gs://bizconnect_lanka1/converted-audios/output.flac';
            console.log("Requesting transcription from Google Speech-to-Text...");
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
                            languageCode: 'en-US',
                        },
                        audio: {
                            uri: cloudStorageUri,
                        },
                    }),
                }
            );

            const googleData = await googleResponse.json();
            
            if (!googleResponse.ok) {
                throw new Error(`Speech-to-Text Error: ${JSON.stringify(googleData)}`);
            }

            const transcript = googleData.results?.[0]?.alternatives?.[0]?.transcript;
            
            if (!transcript) {
                throw new Error('No transcript received from Speech-to-Text service');
            }

            console.log("Received transcript:", transcript);
            console.log("For field:", field);
            
            // Update form data with transcript
            setFormData(prev => {
                const newData = {
                    ...prev,
                    [field]: transcript
                };
                console.log("Updated form data:", newData);
                return newData;
            });
            
            return transcript;
        } catch (error) {
            console.error("Error processing audio:", error);
            if (!error.message.includes('Network Error')) {
                alert(`Error processing audio: ${error.message}`);
            }
            return null;
        } finally {
            setIsLoading(false);
            setProcessingField(null);
        }
    };

    // Start MediaRecorder to capture voice input
    const startRecording = async (field) => {
        try {
            chunksRef.current = [];
            console.log("Starting recording for field:", field);
            setEditableField(field);
            
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone access granted");
            
            mediaRecorder.current = new MediaRecorder(stream);
            
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                    console.log("Audio data added to chunks");
                }
            };

            mediaRecorder.current.onstop = async () => {
                console.log("Recording stopped, processing audio...");
                console.log("Current editable field:", editableField);
                
                const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
                console.log("Audio blob created, size:", audioBlob.size);
                
                // Process the audio with the current field value
                await processAudio(audioBlob, field);
            };

            mediaRecorder.current.start();
            setIsListening(true);
            console.log("Recording started");
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Please grant microphone permissions.");
            setIsListening(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
            console.log("Manually stopping recording");
            mediaRecorder.current.stop();
            
            if (mediaRecorder.current.stream) {
                mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
            }
        }
        setIsListening(false);
    };

    const toggleListening = (field) => {
        if (isListening) {
            stopRecording();
        } else {
            startRecording(field);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Field validation logic remains the same
        const requiredFields = [
            "description",
            "website_name",
            "home_description",
            "home_paragraphs",
            "about_description"
        ];
    
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === "") {
                alert(`Please fill in the ${field.replace("_", " ")} field.`);
                return;
            }
        }
    
        // Set submitting state to true to show the modal
        setIsSubmitting(true);
        
        try {
            // Form submission logic...
            const formattedServices = formData.services.map(service => ({
                name: service.name.trim(),
                description: service.description.trim(),
                image: service.image.trim()
            }));
        
            const updatedFormData = { 
                ...formData, 
                services: formattedServices 
            };
        
            console.log("Generated JSON:", JSON.stringify(updatedFormData, null, 2));
        
            const endpoint = template1.endpoint;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData)
            });
        
            if (response.ok) {
                const result = await response.json();
        
                if (result.zip_file_base64) {
                    // File download logic...
                    const byteCharacters = atob(result.zip_file_base64);
                    const byteArrays = [];
        
                    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                        const slice = byteCharacters.slice(offset, offset + 512);
                        const byteNumbers = new Array(slice.length);
        
                        for (let i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                        }
        
                        const byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                    }
        
                    const blob = new Blob(byteArrays, { type: 'application/zip' });
                    const zipFileUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = zipFileUrl;
                    a.download = 'generated_files.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    alert("No base64 data found in the response.");
                }
            } else {
                alert("Submission failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed.");
        } finally {
            setIsSubmitting(false); // Set back to false when done
        }
    };

    // Define handleServiceChange
    const handleServiceChange = (e, index) => {
        const updatedServices = formData.services.map((service, i) =>
            i === index ? { ...service, [e.target.name]: e.target.value } : service
        );
        setFormData({ ...formData, services: updatedServices });
    };

    // Define handleAddService
    const handleAddService = () => {
        const newService = { name: "", description: "", image: "" };
        setFormData({ ...formData, services: [...formData.services, newService] });
    };

    // Define handleRemoveService
    const handleRemoveService = (index) => {
        const updatedServices = formData.services.filter((_, i) => i !== index);
        setFormData({ ...formData, services: updatedServices });
    };

    return (
        <div className="container">
            <LoadingModal isVisible={isSubmitting} />
            <h1 className="heading">Web Template Generator</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    {Object.keys(formData).map((key) => (
                        key !== "services" && key !== "footer_contact_details" &&
                        <div key={key} className="form-group">
                            <label className="label">{key.replace("_", " ").toUpperCase()}:</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    className="input"
                                    disabled={key !== "logo_url" && key !== "home_image_url" && key !== "service_image" && key !== "home_images" }
                                />
                                {key !== "logo_url" && key !== "home_image_url" && key !== "home_images" && key !== "service_image" && (
                                    <button 
                                        type="button" 
                                        onClick={() => toggleListening(key)} 
                                        className="mic-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading && processingField === key ? (
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        ) : (
                                            <FontAwesomeIcon icon={isListening && editableField === key ? faStop : faMicrophone} />
                                        )}
                                    </button>
                                )}
                            </div>
                            {isLoading && processingField === key && (
                                <div className="processing-indicator">Processing your voice input...</div>
                            )}
                        </div>
                    ))}

                    {/* Service Section */}
                    <div className="form-group">
                        <label className="label">Services:</label>
                        {formData.services.map((service, index) => (
                            <div key={index} className="service-container">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Service Name"
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Service Description"
                                    value={service.description}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={service.image}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    className="input"
                                />
                                <button type="button" onClick={() => handleRemoveService(index)} className="button">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddService} className="button">Add Service</button>
                    </div>

                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WebVoice;