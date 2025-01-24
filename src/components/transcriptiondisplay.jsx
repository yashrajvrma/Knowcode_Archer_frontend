import React from "react";

const TranscriptionDisplay = ({ transcript }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Transcription:</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          maxWidth: "400px",
          margin: "auto",
          wordWrap: "break-word"
        }}
      >
        {transcript}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
