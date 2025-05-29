import { aboutMeInfo } from "../constants/Info.js";
import { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";

const AboutMe = () => {
  const [copied, setCopied] = useState(false);
  const globeRef = useRef();
  const [skillsIndex, setSkillsIndex] = useState(0);

  const cycleSkills = () => {
    setSkillsIndex((prevIndex) => (prevIndex + 1) % aboutMeInfo.skills.length);
  };

  useEffect(() => {
    if (globeRef.current) {
      if (globeRef.current.controls()) {
        globeRef.current.controls().autoRotate = true;
      }
    }
  }, []);

  return (
    <section className="c-space h-fit" id="about">
      <div className="grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 gap-5">
        {/* Intro */}
        <div className="col-span-1 lg:row-span-1">
          <div className="grid-container">
            <img src={aboutMeInfo.imagePath.intro} alt="grid-1" className="w-full h-[240px] object-contain" />

            <div>
              <p className="grid-headtext">
                {`${aboutMeInfo.firstName} ${aboutMeInfo.lastName}（${aboutMeInfo.aka}）`}{" "}
              </p>
              <p className="grid-subtext">{aboutMeInfo.content.intro}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="col-span-1 lg:row-span-1">
          <div className="grid-container">
            <div
              className="w-full h-[240px] flex justify-center items-center cursor-pointer overflow-hidden"
              onClick={cycleSkills}
            >
              <div className="relative w-full h-full flex justify-center items-center">
                {aboutMeInfo.skills.map((skill, index) => {
                  const relativePosition =
                    (index - skillsIndex + aboutMeInfo.skills.length) % aboutMeInfo.skills.length;

                  return (
                    <div
                      key={index}
                      className="absolute rounded-xl border-2 border-purple-700 bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg p-4 flex items-center justify-center transition-all duration-500 select-none"
                      style={{
                        width: "100px",
                        height: "100px",
                        transform: `translateX(${relativePosition * 30 - 30}px) scale(${
                          1 - Math.min(relativePosition, 3) * 0.1
                        })`,
                        zIndex: aboutMeInfo.skills.length - relativePosition,
                        opacity: relativePosition < 5 ? 1 : 0.1,
                      }}
                    >
                      <img src={skill} className="max-w-full max-h-full object-contain" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="grid-headtext">Skills</p>
              <p className="grid-subtext">{aboutMeInfo.content.skills}</p>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="col-span-1 lg:row-span-1">
          <div className="grid-container">
            <div className="rounded-3xl w-full h-[240px] flex justify-center items-center">
              <Globe
                ref={globeRef}
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelSize={5}
                labelsData={[
                  {
                    lat: aboutMeInfo.location.lat,
                    lng: aboutMeInfo.location.lng,
                    text: aboutMeInfo.location.city,
                    color: "white",
                  },
                ]}
              />
            </div>
            <div>
              <div className="flex flex-col gap-3">
                <p className="grid-headtext">Contact Info</p>

                <div className="flex items-center gap-2 justify-center">
                  <p className="text-l break-all font-semibold">{aboutMeInfo.email}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aboutMeInfo.link.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 5000);
                    }}
                    className="p-1"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#22c55e"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2v-6z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  {Object.entries(aboutMeInfo.link).map(
                    ([name, link]) =>
                      link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="social-icon" key={name}>
                          <img src={`/assets/icon/${name}.svg`} alt={name} className="w-1/2 h-1/2" />
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
