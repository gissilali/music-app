import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Artist from "./pages/Artist";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="artist/:id" element={<Artist />} />
      </Routes>
    </div>
  );
}

export default App;
