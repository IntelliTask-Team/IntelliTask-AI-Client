import React, { useState } from "react";
import axios from "axios";

function Ai() {
  const [response, setResponse] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = () => {
    if (!apiCalled) {
      setIsLoading(true);
      const prompt = "Tell me a super short joke about coding";
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/openai`, { prompt })
        .then((apiResponse) => {
          setResponse(apiResponse.data.choices[0].message.content);
          setApiCalled(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("OpenAI Error : ", error);
        });
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-xl mb-2">
        Ask the AI for a project breakdown
      </h2>
      {isLoading ? (
        <div className="flex flex-col justify-start w-20">
          <img src="../images/waiting.gif" alt="Loading GIF" />
        </div>
      ) : (
        response && (
          <div className="mb-3 mt-4">
            <p className="font-light">{response}</p>
          </div>
        )
      )}
      <button
        onClick={handleApiCall}
        className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 lg:mt-4"
      >
        Ask the AI
      </button>
    </div>
  );
}

export default Ai;
