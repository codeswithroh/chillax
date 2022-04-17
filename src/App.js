import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Emotion from "./sections/Emotion/Emotion";
import Home from "./sections/Home/Home";
import MovieRecommendation from "./sections/MovieRecommendation/MovieRecommendation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/movie/capture"} element={<Emotion />} />
          <Route
            exact
            path={"/movie/show/:emotion"}
            element={<MovieRecommendation />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
