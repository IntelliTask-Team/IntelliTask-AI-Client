import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage w-full bg-white rounded-lg shadow sm:max-w-md md:mt-28">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>

        <form onSubmit={handleSignupSubmit}>
          <div className="pb-2">
            <label>Email</label>
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
            placeholder="yourname@mail.com"
          />

          <div className="pb-2">
            <label>Password</label>
          </div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="• • • • • • • •"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5"
          />

          <div className="pb-2">
            <label>Username</label>
          </div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-8"
            placeholder="Jane Doe"
          />

          <button
            type="submit"
            className="w-full text-white bg-vert hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="text-sm font-light text-gray-500">
          Already have account ?
          <a
            href="/login"
            className="font-medium text-primary-600 hover:underline pl-2"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
