import React from "react";
import SmoothScroll from "./components/Lenis";
import Home from "./pages/Home";
import Work from "./pages/Work";
import { Route, Routes } from "react-router-dom";
import PageTransition from "./components/common/PageTransition";
import WorkDetails from "./components/workcomp/WorkDetails";

const App = () => {
  return (
    <div className="bg-[#000014] text-amber-100 overflow-x-hidden">
      <SmoothScroll />
      {/* <PageTransition> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetails />} />
      </Routes>
      {/* </PageTransition> */}
    </div>
  );
};

export default App;
