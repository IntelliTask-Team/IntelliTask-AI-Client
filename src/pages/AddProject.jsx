import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requestBody = { title, description };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/projects`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setIsLoading(false);

        const projectId = response.data._id;

        navigate(`/projects/${projectId}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="AddProject w-full lg:w-1/2 bg-white rounded-lg shadow sm:max-w-md md:max-w-xl lg:max-w-2xl md:mt-28">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        {isLoading ? (
          <div className="flex flex-col justify-center m-auto w-20">
            <img src="/images/waiting.gif" alt="Loading GIF" />
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create a new project
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="pb-2">
                <label>Name of your project</label>
              </div>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your awesome AI project's name."
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
              />

              <div className="pb-2">
                <label>Description</label>
              </div>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Write your project description here. Talk about your goal, the benefits you expect, the features that you need, your constraints etc. Keep it simple, clear and efficient."
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
              />
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="w-1/2 md:w-1/4 place-content-center text-white bg-vert hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AddProject;
