import axios from "axios";
import React, { useState } from "react";

function ProjectDelete({ projectId, completeDeleteSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const deleteProject = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        if (completeDeleteSuccess) completeDeleteSuccess();
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-rouge text-white hover:bg-red-700"
      >
        Delete Project
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="m-6 bg-white rounded-xl shadow flex flex-col items-end p-6 space-y-4 sm:p-8 bg-gray-50 border border-gray-300">
            <h2 className="text-l font-semibold leading-tight tracking-tight text-gray-900 mb-3">Are you sure you want to delete this project?</h2>
            <div>
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-stone-300 text-stone-500 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                onClick={deleteProject}
                className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-rouge text-white hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDelete;
