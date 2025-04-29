import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Developer from "../components/Developer.jsx";
import CanvasLoader from "../components/Loading.jsx";
import { experienceInfo } from "../constants/info.js";

const Experience = () => {
  const [animationName, setAnimationName] = useState("idle");

  return (
    <section className="c-space my-10" id="experience">
      <div className="w-full text-white-600 flex items-center justify-center">
        <div className="experience-container">
          <div className="experience-canvas">
            <Canvas>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />

              <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3} scale={3} animationName={animationName} />
              </Suspense>
            </Canvas>
          </div>

          <div className="experience-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {experienceInfo.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOut={() => setAnimationName("idle")}
                  className="expeirence-content-container group"
                >
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="experience-content_logo">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>

                    <div className="experience-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-white-800">{item.name}</p>
                        <p className="text-sm">{item.pos}</p>
                      </div>
                      <p className="text-sm text-right whitespace-nowrap">{item.duration}</p>
                    </div>
                    <ul className="list-disc list-inside mt-3 group-hover:text-white transition-all ease-in-out duration-500">
                      {item.highlights.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
