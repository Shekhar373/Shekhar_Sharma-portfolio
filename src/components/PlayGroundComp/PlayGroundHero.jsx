import React from "react";
import RotatingGallery from "../../r3f/RotatingGallery";

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
];

const PlayGroundHero = () => {
  return (
    <div className="h-screen w-full flex items-center px-10">
      <div>
        <h1 className="text-5xl">THINGS I BUILD <br /> WHEN I'M NOT <br /> BUILDING WEBSITES</h1>
      </div>
      <RotatingGallery images={images} />
    </div>
  );
};

export default PlayGroundHero;
