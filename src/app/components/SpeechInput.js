"use client";
import { useEffect, useState } from "react";

export default function SpeechInput({ onResult }) {
  const [listening, setListening] = useState(false);

  const handleClick = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  };

  return (
    <button
      className="p-4 bg-blue-600 text-white rounded-xl"
      onClick={handleClick}
    >
      🎙️ {listening ? "Listening..." : "Tap to Speak"}
    </button>
  );
}
