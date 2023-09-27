import React, { useState, useEffect } from "react";
import axios from "axios";

function Ai() {
  const [response, setResponse] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  {
    /* ***** ON CLICK ANIMATION MADNESS ***** */
  }
  useEffect(() => {
    // Function to handle the animation on button click
    function pop(e) {
      for (let i = 0; i < 30; i++) {
        createParticle(e.clientX, e.clientY);
      }
    }

    function createParticle(x, y) {
      const particle = document.createElement("particle");
      document.body.appendChild(particle);
      const size = Math.floor(Math.random() * 10 + 3);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;

      const destinationX = x + (Math.random() - 0.5) * 2 * 75;
      const destinationY = y + (Math.random() - 0.5) * 2 * 75;
      const animation = particle.animate(
        [
          {
            transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
            opacity: 1,
          },
          {
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: "cubic-bezier(0, .9, .57, 1)",
          delay: Math.random() * 200,
        }
      );
      animation.onfinish = () => {
        particle.remove();
      };
    }

    // Add the click event listener when the component mounts
    if (document.body.animate) {
      const apiButton = document.querySelector("#API");
      if (apiButton) {
        apiButton.addEventListener("click", pop);
      }
    }

    // Remove the click event listener when the component unmounts
    return () => {
      if (document.body.animate) {
        const apiButton = document.querySelector("#API");
        if (apiButton) {
          apiButton.removeEventListener("click", pop);
        }
      }
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  {
    /* ***** END OF ON CLICK ANIMATION MADNESS ***** */
  }

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
        id="API"
        className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 lg:mt-4"
      >
        Ask the AI
      </button>
    </div>
  );
}

export default Ai;
