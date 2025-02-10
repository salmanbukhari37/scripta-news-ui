import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/error-404.png";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex flex-col items-center justify-center text-center text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-xl w-full">
        <div className="flex justify-center mb-6">
          <img
            src={NotFoundImage}
            alt="404"
            className="w-32 h-32 object-cover "
          />
        </div>
        <p className="text-xl mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="space-x-6">
          <Link
            to="/news"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
