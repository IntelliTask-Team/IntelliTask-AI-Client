import React, { useState } from "react";
import axios from "axios";

function Ai() {
  const storedToken = localStorage.getItem("authToken");
  const [response, setResponse] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  
  const handleApiCall = () => {
    if (!apiCalled) {
      const prompt = "Tell me a super short joke about coding";
      axios
      .post(`${import.meta.env.VITE_API_URL}/api/openai`, { prompt }, 
      {headers: { Authorization: `Bearer ${storedToken}` }}
        )
        .then((apiResponse) => {
          setResponse(apiResponse.data.choices[0].message.content);
          setApiCalled(true);
        })
        .catch((error) => {
          console.error("OpenAI Error : ", error);
        });
    }
  };

  return (
    <div>
      <h2>Ask our AI for help</h2>
      {response && <p>Response from AI: {response}</p>}
      <button onClick={handleApiCall}>Ask the AI</button>
    </div>
  );
}

export default Ai;
