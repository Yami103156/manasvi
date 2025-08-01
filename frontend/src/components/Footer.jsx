import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white py-4"
      style={{ background: "linear-gradient(to right, #b39ddb, #7e57c2)" }}
    >
      <div className="container text-center">
        <p>“You are enough. You always have been.”</p>
        <p className="mt-2">
          <Link to="/" className="text-white mx-2 text-decoration-none">
            Home
          </Link>{" "}
          |{" "}
          <Link to="/chat" className="text-white mx-2 text-decoration-none">
            Chat
          </Link>{" "}
          |{" "}
          <Link to="/journal" className="text-white mx-2 text-decoration-none">
            Journal
          </Link>{" "}
          |{" "}
          <Link to="/resources" className="text-white mx-2 text-decoration-none">
            Resources
          </Link>{" "}
          |{" "}
          <Link to="/about" className="text-white mx-2 text-decoration-none">
            About
          </Link>
        </p>
        <p>© 2025 Manasvi AI</p>
      </div>
    </footer>
  );
};

export default Footer;
