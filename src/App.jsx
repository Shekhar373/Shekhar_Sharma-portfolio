import React from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import { Route, Routes } from "react-router-dom";
import PageTransition from "./components/common/PageTransition";
import WorkDetails from "./components/workcomp/WorkDetails";
import LenisComponent from "./components/common/Lenis";
import ScrollToTop from "./components/common/ScrollToTop";
import Layout from "./components/common/Layout";
import Navbar from "./components/common/Navbar";
import PlayGround from "./pages/PlayGround";

const App = () => {
  return (
    <div className="bg-[#000002] text-amber-100 overflow-x-hidden">
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>
      <LenisComponent />
      <ScrollToTop />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<PlayGround />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetails />} />
        </Routes>
    </div>
  );
};

export default App;
