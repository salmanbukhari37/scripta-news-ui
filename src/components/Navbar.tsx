import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <a href="#" className="text-white text-2xl font-bold">
          MyBrand
        </a>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-400">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">
          About
        </a>
        <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">
          Services
        </a>
        <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
