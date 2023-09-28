import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {

        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser("/projects");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage w-full bg-white rounded-lg shadow sm:max-w-md md:mt-28">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Welcome back !
        </h1>

        <form onSubmit={handleLoginSubmit}>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-8"
          />

          <button
            type="submit"
            className="w-full text-white bg-vert hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Log In
          </button>
        </form>
        {errorMessage && (
          <p className="error-message text-sm font-light text-gray-500">
            {errorMessage}
          </p>
        )}

        <p className="text-sm font-light text-gray-500">
          Don't have an account yet ?
          <a
            href="/signup"
            className="font-medium text-primary-600 hover:underline pl-2"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
