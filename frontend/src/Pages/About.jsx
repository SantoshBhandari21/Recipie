import React from "react";

const About = () => {
  return (
    <div className="bg-orange-50 min-h-screen flex flex-col">

      {/* About Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          About RecipeShare
        </h2>
        <p className="text-gray-600 mb-4">
          RecipeShare is a platform where food lovers can discover, share,
          and enjoy amazing recipes from around the world.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you're a beginner or a professional chef, you can explore
          new dishes, save your favorites, and inspire others with your
          own creations.
        </p>
        <p className="text-gray-600">
          Our mission is to bring people together through the love of food ❤️
        </p>
      </main>


    </div>
  );
};

export default About;