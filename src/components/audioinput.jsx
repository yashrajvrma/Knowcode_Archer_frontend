import React, { useState, useEffect } from "react";

const AudioInput = ({ onTranscriptionComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [timer, setTimer] = useState(null);
  const recognitionRef = React.useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      clearTimeout(timer);
      const interimTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(interimTranscript);

      if (event.results[0].isFinal) {
        onTranscriptionComplete(interimTranscript);
      }

      setTimer(setTimeout(() => {
        onTranscriptionComplete(interimTranscript);
        recognition.stop();
      }, 5000));
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [timer, onTranscriptionComplete]);

  const startListening = () => {
    setTranscript("");
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current.stop();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>Start Listening</button>
      <button onClick={stopListening} disabled={!isListening}>Stop Listening</button>
      <div>{isListening ? "Listening..." : "Click to start listening"}</div>
    </div>
  );
};

export default AudioInput;
