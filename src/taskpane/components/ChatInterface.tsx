// ChatInterface.js
import React, { useState } from "react";

const ChatInterface = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSendQuestion = async () => {
    // Simulate API response for demonstration
    const response = "This is a sample AI-generated response.";

    setResponses((prevResponses) => [...prevResponses, { question, response }]);
    setQuestion("");
  };

  return (
    <div>
      <h3>Ask a Question</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      />
      <button onClick={handleSendQuestion}>Send</button>
      <ul>
        {responses.map((chat, index) => (
          <li key={index}>
            <strong>Q:</strong> {chat.question} <br />
            <strong>A:</strong> {chat.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatInterface;
