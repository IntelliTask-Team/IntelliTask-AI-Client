import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-center lg:justify-between flex-wrap bg-jaune p-6 md:px-20 w-full">
      <Link to={`/`}>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            className="fill-current h-8 w-8 mr-3 mb-1"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            src="/images/intellitask-ai.png"
          />
          <p className="font-bold text-2xl text-white">
            IntelliTask <span className="font-light text-xl">AI</span>
          </p>
        </div>
      </Link>

      <div className="w-full block flex-grow flex flex-col items-center lg:flex-row lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow flex flex-row justify-end lg:mr-7">
          <Link
            to={`/`}
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Projects
          </Link>
          <Link
            to={`/`}
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Login
          </Link>
          <Link
            to={`/`}
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Register
          </Link>
          <Link
            to={`/`}
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Logout
          </Link>
        </div>

        <div>
          <Link
            to={`/create-project`}
            className="inline-block text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white border-transparent hover:border-white hover:text-white hover:bg-transparent mt-4 lg:mt-0"
          >
            New AI Project
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
