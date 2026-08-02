import React from "react";
import SmoothScroll from "./components/Lenis";
import Home from "./pages/Home";
import Work from "./pages/Work";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-[#000014] text-amber-100 overflow-x-hidden">
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        {/* <Route path="/work/:slug" element={<ProjectDetails />} /> */}
      </Routes>
    </div>
  );
};

export default App;
