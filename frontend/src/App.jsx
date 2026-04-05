import React from "react";
import { Route, Routes } from "react-router-dom";
import Headers from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Meals from "./Pages/Meals";
import RecipieDetails from "./Pages/RecipieDetails";

const App = () => {
  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/recipe/:id" element={<RecipieDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
