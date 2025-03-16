import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoverTemplateGenerator.css";
import template1 from "../assets/templates/template1.png";
import template2 from "../assets/templates/template2.png";
import template3 from "../assets/templates/template3.png";
import template4 from "../assets/templates/template4.png";
import template5 from "../assets/templates/template5.png";
import template6 from "../assets/templates/template6.png";
import template7 from "../assets/templates/template7.png";
import template8 from "../assets/templates/template8.png";

const CoverTemplateGenerator = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, title: "Template 1", image: template1 },
    { id: 2, title: "Template 2", image: template2 },
    { id: 3, title: "Template 3", image: template3 },
    { id: 4, title: "Template 4", image: template4 },
    { id: 5, title: "Template 5", image: template5 },
    { id: 6, title: "Template 6", image: template6 },
    { id: 7, title: "Template 7", image: template7 },
    { id: 8, title: "Template 8", image: template8 },
  ];

  const handleSelectTemplate = (template) => {
    // Dynamically navigate to a specific route based on the template ID
    navigate(`/edit-cover${template.id}`, { state: { selectedTemplate: template } });
  };

  return (
    <div className="cover-template-generator">
      <h1>Select Your Business Proposal Template</h1>
      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleSelectTemplate(template)}
          >
            <img src={template.image} alt={template.title} className="template-image" />
            <p className="template-title">{template.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverTemplateGenerator;
