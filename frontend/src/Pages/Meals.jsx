import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Meals = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        // Limit to top 10 meals
        setMeals((data.meals || []).slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading delicious meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
          Chicken Recipes 🍗
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Discover {meals.length} delicious chicken recipes from around the
          world
        </p>

        {meals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No meals found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {meal.strMeal}
                  </h3>

                  <div className="mb-3 flex gap-2 flex-wrap">
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded">
                      {meal.strCategory}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded">
                      {meal.strArea}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {meal.strTags ? meal.strTags : "Delicious meal"}
                  </p>

                  <button
                    onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                    className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition text-sm font-semibold"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;
