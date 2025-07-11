import React from "react";
import { Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatisticsPage from "./pages/StatisticsPage";
import RedirectHandler from "./pages/RedirectHandler";

const App = () => (
  <Routes>
    <Route path="/" element={<ShortenerPage />} />
    <Route path="/statistics" element={<StatisticsPage />} />
    <Route path="/:shortcode" element={<RedirectHandler />} />
  </Routes>
);

export default App;

