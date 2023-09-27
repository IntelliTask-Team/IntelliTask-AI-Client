import React, { useState } from "react";

function DemoAiResponse() {
  const [response, setResponse] = useState(null);
  const aiResponses = [
    "Lorem ipsum dolor.",
    "Amet consectetur elit.",
    "Dolor sit adipisicing.",
  ];

  const handleAskAI = () => {
    setTimeout(() => {
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setResponse(randomResponse);
    }, 1000);
  };

  return (
    <div>
      <button onClick={handleAskAI}>Ask AI</button>
      {response && <p>AI says: {response}</p>}
    </div>
  );
}

export default DemoAiResponse;
