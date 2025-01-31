// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
// import "./WebVoice.css";

// const templates = {
//     template1: {
//         endpoint: "http://127.0.0.1:5000/generate_template_1_website",
//         data: {
//             logo_url: "",
//             description: "",
//             website_name: "",
//             home_image_url: "",
//             home_description: "",
//             home_paragraphs: "",
//             home_images: "",
//             services: [],
//             about_description: "",
//             mission: "",
//             vision: ""
//         }
//     },
//     template2: {
//         endpoint: "http://127.0.0.1:5000/generate_template_2_website",
//         data: {
//             description: "",
//             logo_url: "",
//             homecards: "",
//             website_name: "",
//             home_image_url: "",
//             home_description: "",
//             home_paragraphs: "",
//             home_images: "",
//             services: [],
//             about_description: "",
//             contact_email: "",
//             footer_contact_details: {
//                 address: "",
//                 phone: "",
//                 email: "",
//                 social_links: {
//                     Facebook: "",
//                     Twitter: "",
//                     LinkedIn: ""
//                 }
//             }
//         }
//     },
//     template3: {
//         endpoint: "http://127.0.0.1:5000/generate_template_3_website",
//         data: {
//             description: "",
//             logo_url: "",
//             homecards: "",
//             website_name: "",
//             home_image_url: "",
//             home_description: "",
//             services: [],
//             about_description: "",
//             contact_email: ""
//         }
//     }
// };

// const WebVoice = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState("template1");
//     const [formData, setFormData] = useState(templates[selectedTemplate].data);
//     const [isListening, setIsListening] = useState(false);
//     const [editableField, setEditableField] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const mediaRecorder = useRef(null);
//     const chunksRef = useRef([]);

//     // Convert audio Blob to base64 string
//     const blobToBase64 = (audioBlob) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result.split(',')[1]);
//             reader.onerror = reject;
//             reader.readAsDataURL(audioBlob);
//         });
//     };

//     // Start MediaRecorder to capture voice input
//     const startRecording = () => {
//         chunksRef.current = []; // Clear previous audio chunks

//         navigator.mediaDevices
//             .getUserMedia({ audio: true })
//             .then((stream) => {
//                 mediaRecorder.current = new MediaRecorder(stream);

//                 mediaRecorder.current.ondataavailable = (event) => {
//                     if (event.data.size > 0) {
//                         chunksRef.current.push(event.data);
//                     }
//                 };

//                 mediaRecorder.current.onstop = async () => {
//                     const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
//                     try {
//                         await uploadAudioToCloudStorage(audioBlob);
//                     } catch (error) {
//                         console.error("Error processing audio:", error);
//                         alert("Error processing audio. Please try again.");
//                     }
//                 };

//                 mediaRecorder.current.start();
//                 setIsListening(true);
//             })
//             .catch((err) => {
//                 console.error("Error accessing microphone:", err);
//                 alert("Please grant microphone permissions.");
//             });
//     };

//     // Stop MediaRecorder manually and create the audio blob
//     const stopRecording = () => {
//         if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
//             mediaRecorder.current.stop();

//             // Stop all tracks in the stream
//             if (mediaRecorder.current.stream) {
//                 mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
//             }
//         }
//         setIsListening(false);
//     };

//     // Upload audio to Google Cloud Storage
//     const uploadAudioToCloudStorage = async (audioBlob) => {
//         if (!audioBlob) {
//             alert("No audio recorded. Please record audio first.");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const base64Audio = await blobToBase64(audioBlob);

//             const cloudFunctionResponse = await fetch('https://us-central1-bizconnect-446515.cloudfunctions.net/function-1', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ audioBase64: base64Audio }),
//             });

//             if (!cloudFunctionResponse.ok) {
//                 const errorDetails = await cloudFunctionResponse.text();
//                 throw new Error(`Cloud Function Error: ${errorDetails}`);
//             }

//             const cloudStorageUri = 'gs://bizconnect_lanka1/converted-audios/output.flac';
//             await transcribeAudioWithGoogleSpeechToText(cloudStorageUri);

//         } catch (error) {
//             console.error("Error:", error);
//             alert(`Error: ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Call Google Speech-to-Text API
//     const transcribeAudioWithGoogleSpeechToText = async (cloudStorageUri) => {
//         try {
//             const googleResponse = await fetch(
//                 'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyACXDLKVVG-LoFcZgnjllRBYCiDfCWNHzo',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         config: {
//                             encoding: 'FLAC',
//                             sampleRateHertz: 48000,
//                             languageCode: 'en-US',
//                         },
//                         audio: {
//                             uri: cloudStorageUri,
//                         },
//                     }),
//                 }
//             );

//             const googleData = await googleResponse.json();

//             if (!googleResponse.ok) {
//                 throw new Error(`Google Speech-to-Text Error: ${JSON.stringify(googleData)}`);
//             }

//             const transcript = googleData.results?.[0]?.alternatives?.[0]?.transcript || 'Could not transcribe audio.';
//             if (editableField) {
//                 setFormData(prev => ({ ...prev, [editableField]: transcript }));
//             }

//         } catch (error) {
//             console.error("Error processing audio with Google Speech-to-Text:", error);
//             alert(`Error: ${error.message}`);
//         }
//     };

//     // Toggle the listening status and trigger recording
//     const toggleListening = (field) => {
//         setEditableField(field); // Set the field to be edited
//         if (isListening) {
//             stopRecording(); // Stop recording when the stop button is clicked
//         } else {
//             startRecording(); // Start recording when the mic button is clicked
//         }
//     };

//     const handleTemplateChange = (e) => {
//         setSelectedTemplate(e.target.value);
//         setFormData(templates[e.target.value].data);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Formatting services before sending to API
//         const formattedServices = formData.services.map((service) => ({
//             name: service.name.trim(),
//             description: service.description.trim(),
//             image: service.image.trim(),
//         }));

//         const updatedFormData = {
//             ...formData,
//             services: formattedServices,
//         };

//         const endpoint = templates[selectedTemplate].endpoint;
//         try {
//             const response = await fetch(endpoint, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedFormData),
//             });
//             const result = await response.json();
//             console.log("Response:", result);
//             alert("Data submitted successfully!");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Submission failed.");
//         }
//     };

//     // Define handleServiceChange
//     const handleServiceChange = (e, index) => {
//         const updatedServices = formData.services.map((service, i) =>
//             i === index ? { ...service, [e.target.name]: e.target.value } : service
//         );
//         setFormData({ ...formData, services: updatedServices });
//     };

//     // Define handleAddService
//     const handleAddService = () => {
//         const newService = { name: "", description: "", image: "" };
//         setFormData({ ...formData, services: [...formData.services, newService] });
//     };

//     // Define handleRemoveService
//     const handleRemoveService = (index) => {
//         const updatedServices = formData.services.filter((_, i) => i !== index);
//         setFormData({ ...formData, services: updatedServices });
//     };

//     return (
//         <div className="container">
//             <h1 className="heading">Web Template Generator</h1>
//             <div className="form-container">
//                 <label className="label">Select Template:</label>
//                 <select
//                     value={selectedTemplate}
//                     onChange={handleTemplateChange}
//                     className="select"
//                 >
//                     <option value="template1">Template 1</option>
//                     <option value="template2">Template 2</option>
//                     <option value="template3">Template 3</option>
//                 </select>

//                 <form onSubmit={handleSubmit} className="form">
//                     {Object.keys(formData).map((key) => (
//                         key !== "services" && key !== "footer_contact_details" &&
//                         <div key={key} className="form-group">
//                             <label className="label">{key.replace("_", " ").toUpperCase()}:</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 value={formData[key]}
//                                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                                 className="input"
//                                 disabled={key !== "logo_url" && key !== "home_image_url" && key !== "service_image"}
//                             />
//                             {key !== "logo_url" && key !== "home_image_url" && key !== "service_image" && (
//                                 <button type="button" onClick={() => toggleListening(key)} className="mic-button">
//                                     <FontAwesomeIcon icon={isListening && editableField === key ? faStop : faMicrophone} />
//                                 </button>
//                             )}
//                         </div>
//                     ))}

//                     {/* Service Section */}
//                     <div className="form-group">
//                         <label className="label">Services:</label>
//                         {formData.services.map((service, index) => (
//                             <div key={index} className="service-container">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Service Name"
//                                     value={service.name}
//                                     onChange={(e) => handleServiceChange(e, index)}
//                                     className="input"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="description"
//                                     placeholder="Service Description"
//                                     value={service.description}
//                                     onChange={(e) => handleServiceChange(e, index)}
//                                     className="input"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="image"
//                                     placeholder="Image URL"
//                                     value={service.image}
//                                     onChange={(e) => handleServiceChange(e, index)}
//                                     className="input"
//                                 />
//                                 <button type="button" onClick={() => handleRemoveService(index)} className="button">Remove</button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={handleAddService} className="button">Add Service</button>
//                     </div>

//                     <button type="submit" className="button">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default WebVoice;

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import "./WebVoice.css";

const templates = {
    template1: {
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
    },
    template2: {
        endpoint: "http://127.0.0.1:5000/generate_template_2_website",
        data: {
            description: "",
            logo_url: "",
            homecards: "",
            website_name: "",
            home_image_url: "",
            home_description: "",
            home_paragraphs: "",
            home_images: "",
            services: [],
            about_description: "",
            contact_email: "",
            footer_contact_details: {
                address: "",
                phone: "",
                email: "",
                social_links: {
                    Facebook: "",
                    Twitter: "",
                    LinkedIn: ""
                }
            }
        }
    },
    template3: {
        endpoint: "http://127.0.0.1:5000/generate_template_3_website",
        data: {
            description: "",
            logo_url: "",
            homecards: "",
            website_name: "",
            home_image_url: "",
            home_description: "",
            services: [],
            about_description: "",
            contact_email: ""
        }
    }
};

const WebVoice = () => {
    const [selectedTemplate, setSelectedTemplate] = useState("template1");
    const [formData, setFormData] = useState(templates[selectedTemplate].data);
    const [isListening, setIsListening] = useState(false);
    const [editableField, setEditableField] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const processAudio = async (audioBlob) => {
        try {
            setIsLoading(true);
            const base64Audio = await blobToBase64(audioBlob);
            
            // Upload to cloud storage
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

            // Wait for a short time to ensure the file is processed
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get transcription
            const cloudStorageUri = 'gs://bizconnect_lanka1/converted-audios/output.flac';
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

            return transcript;
        } finally {
            setIsLoading(false);
        }
    };


    // Start MediaRecorder to capture voice input
    const startRecording = async () => {
        try {
            chunksRef.current = [];
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            mediaRecorder.current = new MediaRecorder(stream);
            
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = async () => {
                try {
                    const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
                    const transcript = await processAudio(audioBlob);
                    
                    if (editableField && transcript) {
                        setFormData(prev => ({
                            ...prev,
                            [editableField]: transcript
                        }));
                    }
                } catch (error) {
                    console.error("Error processing audio:", error);
                    // Don't show alert for network errors, as they might be temporary
                    if (!error.message.includes('Network Error')) {
                        alert(`Error processing audio: ${error.message}`);
                    }
                }
            };

            mediaRecorder.current.start();
            setIsListening(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Please grant microphone permissions.");
            setIsListening(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
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
            setEditableField(field);
            startRecording();
        }
    };
 
    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
        setFormData(templates[e.target.value].data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formatting services before sending to API
        const formattedServices = formData.services.map((service) => ({
            name: service.name.trim(),
            description: service.description.trim(),
            image: service.image.trim(),
        }));

        const updatedFormData = {
            ...formData,
            services: formattedServices,
        };

        const endpoint = templates[selectedTemplate].endpoint;
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData),
            });
            const result = await response.json();
            console.log("Response:", result);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed.");
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
            <h1 className="heading">Web Template Generator</h1>
            <div className="form-container">
                <label className="label">Select Template:</label>
                <select
                    value={selectedTemplate}
                    onChange={handleTemplateChange}
                    className="select"
                >
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                    <option value="template3">Template 3</option>
                </select>

                <form onSubmit={handleSubmit} className="form">
                    {Object.keys(formData).map((key) => (
                        key !== "services" && key !== "footer_contact_details" &&
                        <div key={key} className="form-group">
                            <label className="label">{key.replace("_", " ").toUpperCase()}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                className="input"
                                disabled={key !== "logo_url" && key !== "home_image_url" && key !== "service_image"}
                            />
                            {key !== "logo_url" && key !== "home_image_url" && key !== "service_image" && (
                                <button type="button" onClick={() => toggleListening(key)} className="mic-button">
                                    <FontAwesomeIcon icon={isListening && editableField === key ? faStop : faMicrophone} />
                                </button>
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