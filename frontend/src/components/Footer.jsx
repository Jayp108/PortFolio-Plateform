import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Portfolio
            </h2>
            <p className="text-sm leading-relaxed">
              A modern MERN-stack portfolio platform to showcase projects,
              skills, and professional experience with secure authentication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-primary transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-primary transition">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>
            <p className="text-sm mb-3">
              Let’s build something great together.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                LinkedIn
              </a>
              <a
                href="mailto:your-email@example.com"
                className="hover:text-primary transition"
              >
                Email
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Portfolio Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
