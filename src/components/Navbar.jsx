import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <p>IntelliTask AI</p>
      </div>

      <div>
        <Link to="/">
          <p>Projects</p>
        </Link>
        <Link to="/">
          <p>Login</p>
        </Link>
        <Link to="/">
          <p>Register</p>
        </Link>
        <Link to="/">
          <p>New AI Project</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
