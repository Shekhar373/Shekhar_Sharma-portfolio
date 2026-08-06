import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { work } from "../../data/project";
import ImageGallery from "./ImageGallery";
import Result from "./Result";
import Footer from "../Footer";

const WorkDetails = () => {
  const container = useRef();
  const { slug } = useParams();
  const project = work.find((p) => p.slug === slug);

  if (!project) return <h1>Project not found</h1>;

  return (
    <main className="bg-white text-black">
      <section className="h-fit w-full flex flex-col gap-10 p-4 md:p-10">
        <div className="pt-[16vh] md:pt-[30vh]">
          <h1 className="text-3xl sm:text-4xl md:text-[5vw] font-heading">{project.title}</h1>
          <h1 className="text-base sm:text-lg md:text-xl mt-2">
            A production company portfolio that doesn't present its work. It
            immerses you in it.
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2 md:gap-5">
            <h1 className="border text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-xl">
              WEB STRATERGY
            </h1>
            <h1 className="border text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-xl">
              DESIGN & BUILD
            </h1>
            <h1 className="border text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-xl">
              VISUAL PORTFOLIO
            </h1>
          </div>
          <div className="relative w-full">
            <img
              className="w-full h-[40vh] sm:h-[60vh] md:h-[80vh] xl:h-[120vh] object-cover rounded-lg"
              src={project.cover}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="h-[60vh] lg:h-screen w-full flex flex-col items-end justify-center gap-8 md:gap-20 p-4 md:p-10">
        <div className="h-auto md:h-[30vh] w-full md:w-[70vw] border-b flex flex-col justify-around pb-8 md:pb-0">
          <h1 className="text-2xl md:text-3xl font-bold">CHALLENGE</h1>
          <h1 className="text-xs md:text-sm mt-3">
            For a production company working with clients like Lollapalooza
            Paris and Santander, the website needed to do what their films do:
            capture attention immediately and hold it. The challenge was
            building a digital experience that felt as intentional and immersive
            as the content Alaska creates.
          </h1>
        </div>
        <div className="h-auto md:h-[30vh] w-full md:w-[70vw] border-b flex flex-col justify-around">
          <h1 className="text-2xl md:text-3xl font-bold mt-8 md:mt-0">SOLUTION</h1>
          <h1 className="text-xs md:text-sm mt-3">
            We designed the site around the directors — not the company. Each
            director becomes an entry point into their own visual universe, with
            video-first presentation and a navigation system that feels like
            moving through scenes, not pages. The result is a site that works
            the way Alaska's films do: image first, always.
          </h1>
        </div>
      </section>
      <section>
        <ImageGallery />
        <Result livelink={project.livelink} />
      </section>

      <Footer />
    </main>
  );
};

export default WorkDetails;
