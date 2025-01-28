// import React, { useState, useRef } from "react";
// import html2canvas from "html2canvas";
// import "./CoverPage9.css";

// const CoverPage9 = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [details, setDetails] = useState({
//     title: "PROJECT",
//     subtitle: "PROPOSAL",
//     preparedBy: "Olivia Wilson",
//     preparedFor: "Avery Davis",
//     website: "www.reallygreatsite.com",
//   });

//   const coverRef = useRef(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     setIsModalOpen(false);
//   };

//   const handleCaptureAndDownload = async () => {
//     if (coverRef.current) {
//       try {
//         const canvas = await html2canvas(coverRef.current);
//         const imageURL = canvas.toDataURL("image/png");
//         console.log("Captured Cover Page Image URL:", imageURL);
//       } catch (error) {
//         console.error("Error capturing cover page:", error);
//       }
//     }
//   };

//   return (
//     <div className="cover-page9-container">
//       <div className="cover-page9" ref={coverRef}>
//         {/* Background Design */}
//         <div className="cover-page9-background"></div>

//         {/* Title Section */}
//         <div className="cover-page9-title">
//           <h1 className="cover-page9-main-title">{details.title}</h1>
//           <h2 className="cover-page9-sub-title">{details.subtitle}</h2>
//         </div>

//         {/* Prepared Info Section */}
//         <div className="cover-page9-info">
//           <p className="cover-page9-prepared-by">
//             <strong>Prepared by:</strong> {details.preparedBy}
//           </p>
//           <p className="cover-page9-prepared-for">
//             <strong>Prepared for:</strong> {details.preparedFor}
//           </p>
//         </div>

//         {/* Footer Section */}
//         <div className="cover-page9-footer">
//           <p>{details.website}</p>
//         </div>
//       </div>

//       {/* Buttons Section */}
//       <div className="buttons-section">
//         <button className="edit-button" onClick={() => setIsModalOpen(true)}>
//           Edit Cover
//         </button>
//         <button className="use-template-button" onClick={handleCaptureAndDownload}>
//           Use this Template
//         </button>
//       </div>

//       {/* Modal for Editing */}
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Edit Cover Details</h2>
//             <form>
//               <label>
//                 Title:
//                 <input type="text" name="title" value={details.title} onChange={handleInputChange} />
//               </label>
//               <label>
//                 Subtitle:
//                 <input type="text" name="subtitle" value={details.subtitle} onChange={handleInputChange} />
//               </label>
//               <label>
//                 Prepared By:
//                 <input type="text" name="preparedBy" value={details.preparedBy} onChange={handleInputChange} />
//               </label>
//               <label>
//                 Prepared For:
//                 <input type="text" name="preparedFor" value={details.preparedFor} onChange={handleInputChange} />
//               </label>
//               <label>
//                 Website:
//                 <input type="text" name="website" value={details.website} onChange={handleInputChange} />
//               </label>
//               <button type="button" onClick={handleSave} className="save-button">
//                 Save
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoverPage9;

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./CoverPage9.css";

const CoverPage9 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState({
    title: "PROJECT",
    subtitle: "PROPOSAL",
    preparedBy: "Olivia Wilson",
    preparedFor: "Avery Davis",
    website: "www.reallygreatsite.com",
  });

  const coverRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleCaptureAndDownload = async () => {
    if (coverRef.current) {
      try {
        const canvas = await html2canvas(coverRef.current);
        const imageURL = canvas.toDataURL("image/png");
        console.log("Captured Cover Page Image URL:", imageURL);
      } catch (error) {
        console.error("Error capturing cover page:", error);
      }
    }
  };

  return (
    <div className="cover-page9-container">
      <div className="cover-page9" ref={coverRef}>
        {/* Background Design */}
        <div className="cover-page9-background"></div>

        {/* Title Section */}
        <div className="cover-page9-title">
          <h1 className="cover-page9-main-title">{details.title}</h1>
          <h2 className="cover-page9-sub-title">{details.subtitle}</h2>
        </div>

        {/* Prepared Info Section */}
        <div className="cover-page9-info">
          <p className="cover-page9-prepared-by">
            <strong>Prepared by:</strong> {details.preparedBy}
          </p>
          <p className="cover-page9-prepared-for">
            <strong>Prepared for:</strong> {details.preparedFor}
          </p>
        </div>

        {/* Footer Section */}
        <div className="cover-page9-footer">
          <p>{details.website}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          Edit Cover
        </button>
        <button className="use-template-button" onClick={handleCaptureAndDownload}>
          Use this Template
        </button>
      </div>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Cover Details</h2>
            <form>
              <label>
                Title:
                <input type="text" name="title" value={details.title} onChange={handleInputChange} />
              </label>
              <label>
                Subtitle:
                <input type="text" name="subtitle" value={details.subtitle} onChange={handleInputChange} />
              </label>
              <label>
                Prepared By:
                <input type="text" name="preparedBy" value={details.preparedBy} onChange={handleInputChange} />
              </label>
              <label>
                Prepared For:
                <input type="text" name="preparedFor" value={details.preparedFor} onChange={handleInputChange} />
              </label>
              <label>
                Website:
                <input type="text" name="website" value={details.website} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={handleSave} className="save-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverPage9;
