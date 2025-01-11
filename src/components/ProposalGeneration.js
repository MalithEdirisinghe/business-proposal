import React from "react";
import "./ProposalGeneration.css";
import successImage from "../assets/success.png";

const ProposalGeneration = () => {
  const sections = [
    { color: "yellow", title: "Company Overview", description: "Briefly introduce your company, including its background, core offerings, and unique selling points." },
    { color: "green", title: "Vision Statement", description: "Outline your long-term aspirations and goals for the company." },
    { color: "blue", title: "Mission Statement", description: "Define the company's purpose and approach to achieving its vision." },
    { color: "red", title: "Executive Summary", description: "Provide a summary of the business proposal, including the problem, solution, target market, financial highlights, and objectives." },
    { color: "yellow", title: "Owners & Partner Details", description: "Introduce the founders, owners, and any strategic partners, detailing their roles and expertise." },
    { color: "green", title: "Industry Overview and Trends", description: "Highlight the state of the industry, key trends, emerging opportunities, and challenges." },
    { color: "blue", title: "Competitors", description: "Analyze competitors, showcasing their strengths and weaknesses, and explain how the company differentiates itself." },
    { color: "red", title: "Target Market and Customer Segments", description: "Define your target audience, including demographics, geographic location, behaviors, and preferences." },
    { color: "yellow", title: "Problem Statement", description: "Clearly state the problem or gap in the market that your business addresses." },
    { color: "green", title: "Proposed Solution", description: "Describe your product, service, or strategy to address the identified problem and its unique value proposition." },
    { color: "blue", title: "Marketing Plan", description: "Detail your strategies for reaching your target market, including pricing, advertising, branding, and promotion plans." },
    { color: "red", title: "Market Analysis", description: "Provide an in-depth analysis of the market, including size, trends, and potential for growth." },
    { color: "yellow", title: "Production Plan", description: "Explain how your products or services will be produced, including sourcing, processes, equipment, and timelines." },
    { color: "green", title: "Technology Stack and Infrastructure", description: "Detail the technologies and systems that will support your operations, such as software, hardware, and IT infrastructure." },
    { color: "blue", title: "Security and Compliance Measures", description: "Describe how your business ensures data security, privacy, and adherence to industry-specific compliance standards." },
    { color: "red", title: "Accreditation and Compliance", description: "List any certifications or accreditations obtained or planned to demonstrate quality, reliability, or adherence to standards." },
    { color: "yellow", title: "Regulatory Compliance and Permits", description: "Provide details on the necessary permits, licenses, and compliance measures required to operate in your industry or location." },
    { color: "green", title: "Supply Chain and Distribution", description: "Explain your supply chain model, including sourcing, logistics, and distribution channels." },
    { color: "blue", title: "Staff", description: "Outline your team structure, key roles, and recruitment strategies." },
    { color: "red", title: "Financial Projections", description: "Present financial forecasts, including revenue, expenses, profit margins, and break-even analysis for the next 3-5 years." },
    { color: "yellow", title: "Risk Management and Mitigation", description: "Identify potential risks and challenges, and explain the strategies in place to address them." },
    { color: "green", title: "Implementation Timeline", description: "Include a detailed timeline with milestones and deadlines for launching or expanding operations." },
    { color: "blue", title: "Exit Strategy", description: "Describe plans for investors to recover their investments, such as acquisitions, IPOs, or strategic partnerships." },
  ];

  return (
    <div className="proposal-generation-container">
      <div className="header-section">
        <div className="header-content">
          <h1>Transforming Ideas into Success: Crafting Business Proposals That Make an Impact!</h1>
          <p>
            Explore the content below to learn essential tools and examples for crafting a powerful business proposal.
            These insights will help you create a proposal that stands out and effectively communicates your ideas.
            After reading, click "Next" at the bottom of the page to move forward.
          </p>
        </div>
        <img src={successImage} alt="Success" className="header-image" />
      </div>
      <div className="content-section">
        {sections.map((section, index) => (
          <div key={index} className="content-item">
            <span className={`dot ${section.color}`}></span>
            <div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="next-button">Next</button>
    </div>
  );
};

export default ProposalGeneration;
