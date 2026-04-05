import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Login
          </button>
          <button className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50">
            Signup
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
