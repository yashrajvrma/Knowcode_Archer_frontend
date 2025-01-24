import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const transcriptionpage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const recognitionRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      clearTimeout(debounceTimeout.current);
    };
  }, [isListening]);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      clearTimeout(debounceTimeout.current); // Clear previous timeout on receiving results
      let result = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }
      setTranscribedText((prev) => prev + " " + result);

      // Set a new timeout to stop listening after 5 seconds of no input
      debounceTimeout.current = setTimeout(() => {
        stopListening();
        console.log("Stopped due to inactivity.");
      }, 5000);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    recognition.onend = () => {
      console.log("Listening stopped...");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    clearTimeout(debounceTimeout.current);
  };

  return (
    <div className="full-page">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <h2>Transcription Page</h2>
      <div>
        {isListening ? (
          <div>
            <p>Listening...</p>
            <button onClick={stopListening} className="btn">Stop Listening</button>
          </div>
        ) : (
          <div>
            <p>Click below to start listening for transcription.</p>
            <button onClick={() => setIsListening(true)} className="btn">Start Listening</button>
          </div>
        )}
        {transcribedText && (
          <div>
            <h3>Transcribed Text:</h3>
            <p>{transcribedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default transcriptionpage;
