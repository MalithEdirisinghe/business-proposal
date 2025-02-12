// import React, { useState } from "react";
// import "./WebText.css";

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

// const WebText = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState("template1");
//     const [formData, setFormData] = useState(templates[selectedTemplate].data);

//     const handleTemplateChange = (e) => {
//         setSelectedTemplate(e.target.value);
//         setFormData(templates[e.target.value].data);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleServiceChange = (e, index) => {
//         const updatedServices = formData.services.map((service, i) => 
//             i === index ? { ...service, [e.target.name]: e.target.value } : service
//         );
//         setFormData({ ...formData, services: updatedServices });
//     };

//     const handleAddService = () => {
//         const newService = { name: "", description: "", image: "" };
//         setFormData({ ...formData, services: [...formData.services, newService] });
//     };

//     const handleRemoveService = (index) => {
//         const updatedServices = formData.services.filter((_, i) => i !== index);
//         setFormData({ ...formData, services: updatedServices });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if required fields are filled
//         const requiredFields = [
//             "description",
//             "website_name",
//             "home_description",
//             "home_paragraphs",
//             "about_description"
//         ];

//         for (let field of requiredFields) {
//             if (!formData[field] || formData[field].trim() === "") {
//                 alert(`Please fill in the ${field.replace("_", " ")} field.`);
//                 return;  // Stop the form submission
//             }
//         }

//         // Formatting services before sending to API
//         const formattedServices = formData.services.map(service => ({
//             name: service.name.trim(),
//             description: service.description.trim(),
//             image: service.image.trim()
//         }));

//         const updatedFormData = { 
//             ...formData, 
//             services: formattedServices 
//         };

//         // Log the updated form data (for testing purposes)
//         console.log("Generated JSON:", JSON.stringify(updatedFormData, null, 2));

//         // Optional: Alert the user that the data has been logged
//         alert("Form data logged to console!");

//         const endpoint = templates[selectedTemplate].endpoint;
//         try {
//             const response = await fetch(endpoint, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedFormData)
//             });

//             // Check if the response is OK
//             if (response.ok) {
//                 const result = await response.json();

//                 // Check if the response contains base64 encoded file
//                 if (result.zip_file_base64) {
//                     // Decode the base64 string to binary data
//                     const byteCharacters = atob(result.zip_file_base64);  // Decode base64 to a string of binary characters
//                     const byteArrays = [];

//                     // Convert the string into byte arrays
//                     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//                         const slice = byteCharacters.slice(offset, offset + 512);
//                         const byteNumbers = new Array(slice.length);

//                         for (let i = 0; i < slice.length; i++) {
//                             byteNumbers[i] = slice.charCodeAt(i);  // Convert character to byte number
//                         }

//                         const byteArray = new Uint8Array(byteNumbers);
//                         byteArrays.push(byteArray);
//                     }

//                     // Create a Blob object from the byte arrays
//                     const blob = new Blob(byteArrays, { type: 'application/zip' });

//                     // Create a URL for the Blob and trigger the download
//                     const zipFileUrl = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.href = zipFileUrl;
//                     a.download = 'generated_files.zip';  // The filename for the downloaded file
//                     document.body.appendChild(a);
//                     a.click();
//                     document.body.removeChild(a);

//                     // alert("Data submitted successfully and file is downloading!");
//                 } else {
//                     alert("No base64 data found in the response.");
//                 }
//             } else {
//                 alert("Submission failed.");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Submission failed.");
//         }
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
//                                 onChange={handleChange}
//                                 className="input"
//                             />
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

// export default WebText;

import React, { useState } from "react";
import "./WebText.css";
import LoadingSpinner from "./LoadingSpinner";

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
    const [isLoading, setIsLoading] = useState(false);

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
                    'Accept': 'application/zip'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get the response as a blob
            const blob = await response.blob();

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
            {isLoading && <LoadingSpinner />}
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
        </>
    );
};

export default WebText;
