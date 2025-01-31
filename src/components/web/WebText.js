import React, { useState } from "react";
import "./WebText.css";

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
    const [formData, setFormData] = useState(templates[selectedTemplate].data);

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
        setFormData(templates[e.target.value].data);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formatting services before sending to API
        const formattedServices = formData.services.map(service => ({
            name: service.name.trim(),
            description: service.description.trim(),
            image: service.image.trim()
        }));

        const updatedFormData = { 
            ...formData, 
            services: formattedServices 
        };

        // Log the updated form data (for testing purposes)
        console.log("Generated JSON:", JSON.stringify(updatedFormData, null, 2));

        // Optional: Alert the user that the data has been logged
        alert("Form data logged to console!");

        // Uncomment the code below if you want to send the data to the API
        const endpoint = templates[selectedTemplate].endpoint;
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData)
            });
            const result = await response.json();
            console.log("Response:", result);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed.");
        }
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
    );
};

export default WebText;
