import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import defaultAvatar from "../assets/profile.webp";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">🍳 RecipeShare</h1>
        <nav className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="text-gray-600 hover:text-orange-500">
            Home
          </Link>
          <Link to="/meals" className="text-gray-600 hover:text-orange-500">
            Meals
          </Link>
          <Link to="/submit" className="text-gray-600 hover:text-orange-500">
            Submit
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-orange-500">
            About
          </Link>

          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar || defaultAvatar}
                  alt={`${currentUser.username}'s profile`}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  {currentUser.username}
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-x-5">
              <Link
                to="/signin"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
