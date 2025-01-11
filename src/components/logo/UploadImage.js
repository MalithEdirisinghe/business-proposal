import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadImage.css";
import Cropper from "react-easy-crop";
import { FaCloudUploadAlt, FaCropAlt, FaTimes } from "react-icons/fa";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setIsCropping(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    if (!image || !croppedAreaPixels) return;

    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = url;
      });

    const getCroppedImg = async (imageSrc, crop) => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const { width, height } = crop;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        width,
        height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          resolve(url);
        }, "image/jpeg");
      });
    };

    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
    setImage(croppedImageUrl);
    setIsCropping(false);
  };

  const clearImage = () => {
    setImage(null);
    setImageFile(null);
    setIsCropping(false);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setGeneratedImageBlob(null);
    setShowModal(false);
  };

  const generateLogo = async () => {
    if (!imageFile) {
      alert("Please upload an image before generating a logo.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      const apiResponse = await fetch("http://127.0.0.1:5000/generate-logo", {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        const blobResponse = await apiResponse.blob();
        setGeneratedImageBlob(blobResponse);
        setShowModal(true);
      } else {
        const errorText = await apiResponse.text();
        alert(`Failed to generate the logo: ${errorText}`);
      }
    } catch (error) {
      console.error("Error generating logo:", error);
      alert("An error occurred while generating the logo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadGeneratedImage = () => {
    if (!generatedImageBlob) return;
    const url = URL.createObjectURL(generatedImageBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-logo.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    if (!generatedImageBlob) {
      alert("No generated image to edit.");
      return;
    }
  
    // Convert the blob to a URL and pass it to the EditVoiceLogo page
    const imageUrl = URL.createObjectURL(generatedImageBlob);
    navigate("/edit-voice-logo", { state: { imageUrl } });
  };
  
  return (
    <div className="upload-image-container">
      <div className="left-panel">
        <div className="branding">
          <h1>BizConnect Lanka</h1>
          <h2>Logo Creation</h2>
        </div>
        <div className="dots-section">
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot blue"></span>
          <span className="dot red"></span>
        </div>
      </div>
      <div className="right-panel">
        <h2>Upload your image here</h2>
        <div className="image-upload-area">
          {image && isCropping ? (
            <div className="cropper-container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          ) : image ? (
            <img src={image} alt="Uploaded Preview" className="uploaded-image" />
          ) : (
            <FaCloudUploadAlt size={150} color="#ccc" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
            disabled={isCropping}
          />
        </div>
        {image && (
          <div className="below-image-buttons">
            {isCropping ? (
              <button className="crop-action-button" onClick={cropImage}>
                Apply Crop
              </button>
            ) : (
              <>
                <button
                  className="crop-button"
                  onClick={() => setIsCropping(true)}
                  disabled={!image}
                >
                  <FaCropAlt /> Crop
                </button>
                <button className="clear-button" onClick={clearImage}>
                  Clear Image
                </button>
                <button
                  className="generate-button"
                  onClick={generateLogo}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {isGenerating && (
        <div className="modal">
          <div className="modal-content">
            <div className="spinner"></div>
            <p>Processing your request...</p>
          </div>
        </div>
      )}
      {showModal && generatedImageBlob && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes
              className="close-icon"
              onClick={() => setShowModal(false)}
            />
            <img
              src={URL.createObjectURL(generatedImageBlob)}
              alt="Generated Logo"
              className="generated-modal-image"
            />
            <div className="modal-buttons">
              <button onClick={downloadGeneratedImage}>Download</button>
              <button onClick={handleEdit}>Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
