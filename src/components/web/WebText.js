import React, { useState, useEffect } from "react";
import "./WebText.css";
import LoadingModal from "./LoadingModal"; // Import the new LoadingModal component

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

const WebText = () => {
    const [selectedTemplate, setSelectedTemplate] = useState("template1");
    const [formData, setFormData] = useState(templates.template1.data);
    const [isLoading, setIsLoading] = useState(false);

    // Function to randomly select a template
    const getRandomTemplate = () => {
        const templateKeys = Object.keys(templates);
        const randomIndex = Math.floor(Math.random() * templateKeys.length);
        return templateKeys[randomIndex];
    };

    // Select a random template when the component mounts
    useEffect(() => {
        const randomTemplate = getRandomTemplate();
        setSelectedTemplate(randomTemplate);
        setFormData(templates[randomTemplate].data);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (e, index) => {
        const updatedServices = formData.services.map((service, i) =>
            i === index ? { ...service, [e.target.name]: e.target.value } : service
        );
        setFormData({ ...formData, services: updatedServices });
    };

    const handleAddService = () => {
        const newService = { name: "", description: "", image: "" };
        setFormData({ ...formData, services: [...formData.services, newService] });
    };

    const handleRemoveService = (index) => {
        const updatedServices = formData.services.filter((_, i) => i !== index);
        setFormData({ ...formData, services: updatedServices });
    };

    // Modify the handleSubmit function in your WebText.jsx component:

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Format the services array
        const formattedServices = formData.services.map(service => ({
            name: service.name.trim(),
            description: service.description.trim(),
            image: service.image.trim()
        }));

        // Create a new object with formatted data
        const requestData = {
            ...formData,
            services: formattedServices,
            // Ensure arrays are properly formatted
            home_paragraphs: Array.isArray(formData.home_paragraphs)
                ? formData.home_paragraphs
                : [formData.home_paragraphs],
            home_images: Array.isArray(formData.home_images)
                ? formData.home_images
                : [formData.home_images],
        };

        const endpoint = templates[selectedTemplate].endpoint;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Changed to expect JSON response
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response first
            const responseData = await response.json();

            // Get the base64 data
            const base64Data = responseData.zip_file_base64;

            if (!base64Data) {
                throw new Error('No ZIP file data received from server');
            }

            // Convert base64 to blob
            const binaryString = window.atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/zip' });

            // Create a download link and trigger it
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'website.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            alert('Website files downloaded successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);  // Stop loading regardless of outcome
        }
    };

    return (
        <>
            {/* Replace the LoadingSpinner with our new LoadingModal */}
            <LoadingModal isVisible={isLoading} />

            <div className="container">
                <h1 className="heading">Web Template Generator</h1>
                <div className="form-container">
                    {/* Display which template was randomly selected */}
                    <div className="template-info">
                        <p className="template-notification">Using {selectedTemplate.replace("template", "Template ")}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="form">
                        {Object.keys(formData).map((key) => (
                            key !== "services" && key !== "footer_contact_details" &&
                            <div key={key} className="form-group">
                                <label className="label">{key.replace("_", " ").toUpperCase()}:</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="input"
                                />
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
        </>
    );
};

export default WebText;