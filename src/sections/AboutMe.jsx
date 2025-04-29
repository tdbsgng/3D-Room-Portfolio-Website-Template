import { aboutMeInfo } from '../constants/info.js';
import { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';

const AboutMe = () => {
  const [copied, setCopied] = useState(false);
  const globeRef = useRef();
  useEffect(() => {
    if (globeRef.current) {
      if (globeRef.current.controls()) {
        globeRef.current.controls().autoRotate = true;
      }
    }
  }, []);

  return (
    <section className="c-space my-5" id="about">
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 order-1">
          <div className="grid-container">
            <img src={aboutMeInfo.imagePath.intro} alt="grid-1" className="w-full h-[240px] object-contain" />

            <div>
              <p className="grid-headtext">Hi, I'm {aboutMeInfo.name} </p>
              <p className="grid-subtext">{aboutMeInfo.content.intro}</p>
            </div>
          </div>
        </div>

        {/* Second section - Tech Stack */}
        <div className="col-span-1 xl:row-span-3 order-2">
          <div className="grid-container">
            <img src={aboutMeInfo.imagePath.techStack} alt="grid-2" className="w-full h-[240px]  object-contain" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">{aboutMeInfo.content.techStack}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 order-4 xl:order-3">
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
                    color: 'white',
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
                    className="p-1">
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#22c55e"
                        className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4">
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
                        <a href={link} target="_blank" rel="noopener noreferrer" className="social-icon">
                          <img src={`/assets/icon/${name}.svg`} alt={name} className="w-1/2 h-1/2" />
                        </a>
                      ),
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
