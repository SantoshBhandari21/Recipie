import React from "react";

const Home = () => {
  return (
    <div className="bg-orange-50 flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="flex items-center justify-center text-center px-4 py-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Discover & Share Delicious Recipes 🍲
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join a community of food lovers. Explore thousands of recipes or share your own creations with the world.
          </p>
          <div className="space-x-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
              Explore Recipes
            </button>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-100 transition">
              Share Your Recipe
            </button>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Featured Recipes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Delicious Dish {item}
                </h4>
                <p className="text-gray-500 text-sm">
                  A tasty recipe you’ll love to cook and share.
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 text-white text-center py-12 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to share your recipe?
        </h3>
        <p className="mb-6">
          Join our community and inspire others with your cooking skills.
        </p>
        <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

    </div>
  );
};

export default Home;