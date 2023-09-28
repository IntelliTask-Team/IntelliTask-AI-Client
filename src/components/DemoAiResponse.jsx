import React, { useState } from "react";

function DemoAiResponse() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoResponse = `This is a demo project. To get some real AI insight for your own projects and unlock the full experience, create a free account.`;
      setIsLoading(false);
      setResponse(demoResponse);
    }, 1000);
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-xl mb-2">
        Ask the AI for a project breakdown
      </h2>

      {isLoading ? (
        <div className="flex flex-col justify-start w-20">
          <img src="/images/waiting.gif" alt="Loading GIF" />
        </div>
      ) : (
        response && (
          <div className="mb-3 mt-4">
            {response && (
              <p className="font-light pt-2 text-red-400 ">{response}</p>
            )}
          </div>
        )
      )}

      <button
        onClick={handleAskAI}
        className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 lg:mt-4"
      >
        Ask AI
      </button>
    </div>
  );
}

export default DemoAiResponse;
