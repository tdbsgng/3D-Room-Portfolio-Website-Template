import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import CanvasLoader from '../components/Loading.jsx';
import ConstrainedOrbitControls from '../components/ConstrainedOrbitControls.jsx';
import { TimeBasedLighting } from '../components/TimeBasedLighting.jsx';
import { Room, Guitar, Mac, Screen, Speaker, InteractiveLogos, Posters } from '../components/RoomItems.jsx';
function Hero(props) {
  const objectConfigs = {
    reactLogoScale: 0.2,
    reactLogoPosition: [-0.5, 0, -9],

    pythonLogoScale: 0.01,
    pythonLogoPosition: [0, 1, -6],

    cppLogoScale: 0.01,
    cppLogoPosition: [0.5, 0, -8],

    logoScale: 1.5,
    logoPosition: [8, 0, 1],

    roomScale: 9,
    roomPosition: [5, 0, -10],

    guitarScale: 10,
    guitarPosition: [-11, -10, -7],

    macScale: 9,
    macPosition: [0, -2.44, -7],

    screenScale: 4,
    screenPostion: [-0.12, 1.75, -9.64],

    speakerScale: 10,
    speaker0Position: [6.5, -2.5, -10],
    speaker1Position: [-6.5, -2.5, -10],

    testPosition: [0, 0, 0],
    cameraPosition: [0, 0, 10],
  };

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            <Leva hidden />
            <ConstrainedOrbitControls cameraPosition={objectConfigs.cameraPosition} isMobile={props.isMobile} />
            {/* <OrbitControls /> */}
            <TimeBasedLighting />
            <Room objectConfigs={objectConfigs} />
            <group>
              <Guitar
                scale={objectConfigs.guitarScale}
                position={objectConfigs.guitarPosition}
                rotation={[0, Math.PI / 6, 0]}
              />
              <InteractiveLogos objectConfigs={objectConfigs} />
              <Mac scale={objectConfigs.macScale} position={objectConfigs.macPosition} rotation={[0, Math.PI, 0]} />
              <Screen
                isMobile={props.isMobile}
                scale={objectConfigs.screenScale}
                position={objectConfigs.screenPostion}
                rotation={[-Math.PI / 36, 0, 0]}
                setActiveSection={props.setActiveSection}
              />
              <Posters />
              <Speaker
                scale={objectConfigs.speakerScale}
                position={objectConfigs.speaker0Position}
                rotation={[0, -Math.PI / 6, 0]}
              />
              <Speaker
                scale={objectConfigs.speakerScale}
                position={objectConfigs.speaker1Position}
                rotation={[0, Math.PI / 6, 0]}
              />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Hero;
