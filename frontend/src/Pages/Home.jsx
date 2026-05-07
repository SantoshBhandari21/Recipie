import React, { useState, useEffect } from "react";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        // Fetch 3 random meals from TheMealDB API
        const mealIds = [52772, 52795, 53050]; // Popular meal IDs
        const mealRequests = mealIds.map((id) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          ).then((res) => res.json()),
        );

        const results = await Promise.all(mealRequests);
        const fetchedMeals = results
          .map((result) => result.meals?.[0])
          .filter((meal) => meal !== undefined);

        setMeals(fetchedMeals);
        setError(null);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load recipes");
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="bg-orange-50 flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center text-center px-4 py-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Discover & Share Delicious Recipes 🍲
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join a community of food lovers. Explore thousands of recipes or
            share your own creations with the world.
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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600 text-lg">
              Loading delicious recipes...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2">
                    {meal.strMeal}
                  </h4>
                  <p className="text-gray-500 text-sm mb-3">
                    {meal.strCategory && `Category: ${meal.strCategory}`}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {meal.strInstructions?.substring(0, 100)}...
                  </p>
                  <button className="w-full bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition text-sm">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
