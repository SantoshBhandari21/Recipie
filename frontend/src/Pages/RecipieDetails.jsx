import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipieDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data = await response.json();
        setMeal(data.meals[0] || null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading recipe details...</p>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">
            {error || "Recipe not found"}
          </p>
          <a
            href="/meals"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Back to Meals
          </a>
        </div>
      </div>
    );
  }

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  // Split instructions into steps
  const instructionSteps = meal.strInstructions
    .split("\r\n")
    .filter((step) => step.trim())
    .map((step, index) => ({
      number: index + 1,
      text: step.trim(),
    }));

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <a
          href="/meals"
          className="inline-block mb-6 text-orange-600 hover:text-orange-700 font-semibold"
        >
          ← Back to Meals
        </a>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {meal.strMeal}
            </h1>

            {/* Recipe Meta Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
                {meal.strCategory}
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {meal.strArea}
              </span>
              {meal.strTags && (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {meal.strTags.split(",")[0]}
                </span>
              )}
            </div>

            {/* Source Link */}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline mb-6 inline-block"
              >
                View Original Recipe →
              </a>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={`ingredient-${index}`}
                        className="mt-1 w-4 h-4 text-orange-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-semibold text-sm">
                          {item.ingredient}
                        </span>
                        {item.measure && (
                          <span className="text-gray-500 text-sm ml-1">
                            - {item.measure}
                          </span>
                        )}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
                Instructions
              </h2>
              <ol className="space-y-4">
                {instructionSteps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-500 text-white font-bold text-sm">
                      {step.number}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Recipe Video */}
            {meal.strYoutube && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                  Video Tutorial
                </h2>
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch Tutorial on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipieDetails;
