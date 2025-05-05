import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { projectsInfo } from "../constants/Info.js";
import MediaDisplay from "../components/MediaDisplay.jsx";

const projectCount = projectsInfo.length;

const Projects = (props) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const media = projectsInfo.map((project, index) => {
    return <MediaDisplay project={project} isMobile={props.isMobile} />;
  });
  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useEffect(() => {
    if (props.windowRef.current) {
      props.windowRef.current.scrollTo(0, 0);
    }
  }, [selectedProjectIndex]);
  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" });
  }, [selectedProjectIndex]);

  const currentProject = projectsInfo[selectedProjectIndex];

  return (
    <section className="c-space h-fit flex items-center justify-center" id="projects">
      <div className="grid xl:grid-cols-2 grid-cols-1 w-full gap-6 px-4">
        {/* Project Info */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl overflow-hidden">
          <div className="absolute top-0 right-0 z-0">
            <img src="/assets/image/spotlight.png" alt="spotlight" className="w-full h-auto object-cover" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-3 relative z-10">
            <div className="flex justify-between items-center">
              <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
            </div>
            <p className="animatedText tracking-wide">{currentProject.desc}</p>
            <p className="text-sm mb-5 ml-auto animatedText">{currentProject.duration}</p>
            <ul className="list-disc list-inside mt-3 group-hover:text-white transition-all ease-in-out duration-500">
              {currentProject.highlights.map((point, index) => (
                <li
                  key={index}
                  className="animatedText tracking-wide"
                  dangerouslySetInnerHTML={{
                    __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                  }}
                />
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5 mt-auto relative z-10">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Details</p>
              <ArrowUpRight className="w-4 h-4 text-purple-500" />
            </a>
          </div>

          {/* Navigation buttons*/}
          <div className="flex justify-between items-center mt-auto relative z-20">
            <button className="arrow-btn relative" onClick={() => handleNavigation("previous")}>
              <ArrowLeft className="w-4 h-4 text-purple-500" />
            </button>

            <p className="text-white text-sm">
              {selectedProjectIndex + 1} / {projectCount}
            </p>

            <button className="arrow-btn relative" onClick={() => handleNavigation("next")}>
              <ArrowRight className="w-4 h-4 text-purple-500" />
            </button>
          </div>
        </div>
        {/* media */}
        <div className="border border-black-300 bg-black-200 rounded-xl relative overflow-hidden">
          {media[selectedProjectIndex]}
        </div>
      </div>
    </section>
  );
};

export default Projects;
