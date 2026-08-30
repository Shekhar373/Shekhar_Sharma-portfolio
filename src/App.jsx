import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
const Work = lazy(() => import("./pages/Work"));

const WorkDetails = lazy(() => import("./components/workcomp/WorkDetails"));
import LenisComponent from "./components/common/Lenis";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/common/Navbar";
import Layout from "./components/common/Layout";
import { TransitionProvider } from "./components/common/PageTransition/TransitionContext";
import PageTransition from "./components/common/PageTransition/PageTransition";
import ImageTrailSimple from "./components/PlayGroundComp/Image-trail/ImageTrailSimple";

// Lazy loaded
const ImageTrail = lazy(
  () => import("./components/PlayGroundComp/Image-trail/ImageTrail"),
);
const PlayGround = lazy(() => import("./pages/PlayGround"));

const Sphare = lazy(() => import("./components/PlayGroundComp/Sphare/Sphare"));

const Text = lazy(() => import("./components/PlayGroundComp/3d-Text/Text"));

const App = () => {
  return (
    <div className="bg-[#000002] text-amber-100 overflow-x-hidden">
      <TransitionProvider>
        {(pageTransition) => (
          <>
            <LenisComponent />
            <ScrollToTop />

            <Navbar />

            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />

                <Route path="/playground">
                  <Route index element={<PlayGround />} />
                  <Route path="sphare" element={<Sphare />} />
                  <Route path="3d-text" element={<Text />} />
                  <Route path="image-trail" element={<ImageTrailSimple />} />
                </Route>

                <Route path="/work" element={<Work />} />

                <Route path="/work/:slug" element={<WorkDetails />} />
              </Route>
            </Routes>

            <PageTransition ref={pageTransition} />
          </>
        )}
      </TransitionProvider>
    </div>
  );
};

export default App;
