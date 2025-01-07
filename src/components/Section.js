import React from 'react';
import './Section.css';

const Section = ({ title, description, image, buttonText, handleClick }) => {
  return (
    <section className="section">
      <div className="section-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleClick} className="section-button">
          {buttonText}
        </button>
      </div>
      <div className="section-image">
        <img src={image} alt={title} />
      </div>
    </section>
  );
};

export default Section;
