export const downloadProposal = async (imageBlob) => {
    const formData = new FormData();
    formData.append("image", imageBlob, "cover_page.png");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/download-proposal/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to download proposal document");
      }
  
      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Business_Proposal_With_Cover.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading proposal:", error);
    }
  };
