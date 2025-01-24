import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";

const LanguageSelectionPage = ({
  selectedSourceLanguage,
  selectedTargetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="full-page">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <h2>Language Selection Page</h2>
      <LanguageSelector
        selectedSourceLanguage={selectedSourceLanguage}
        selectedTargetLanguage={selectedTargetLanguage}
        onSourceLanguageChange={onSourceLanguageChange}
        onTargetLanguageChange={onTargetLanguageChange}
      />
      <button
        onClick={() => navigate("/transcription")}
        className="btn"
        style={{ marginTop: "20px" }}
      >
        Speak
      </button>
    </div>
  );
};

export default LanguageSelectionPage;
