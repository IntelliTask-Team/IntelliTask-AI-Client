import { useState } from "react";

function ProjectEdit({ project, onSave }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleSave = () => {
    onSave(title, description);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
        Edit - {title}
      </h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your awesome AI project's name."
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6 mt-3"
      />

      <label className="font-medium">
        A better description is a better prompt :
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        placeholder="Write your project description here. Talk about your goal, the benefits you expect, the features that you need, your constraints etc. Keep it simple, clear and efficient. Write in any language and receive a response in the same one."
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5 mt-3"
      />

      <div className="flex flex-col md:flex-row mb-4 items-start">
        <button
          onClick={handleSave}
          className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 mr-0 md:mr-4 mb-3 md:mb-0"
        >
          Save Changes
        </button>
        <button
          onClick={() => onSave(project.title, project.description)}
          className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-stone-300 text-stone-500 hover:text-stone-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProjectEdit;
