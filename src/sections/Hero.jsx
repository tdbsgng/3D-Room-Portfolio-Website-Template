import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import CanvasLoader from "../components/Loading.jsx";
import ConstrainedOrbitControls from "../components/ConstrainedOrbitControls.jsx";
import { Lighting } from "../components/Lighting.jsx";
import { Room, Guitar, Mac, Screen, Speaker, InteractiveLogos, Posters } from "../components/RoomItems.jsx";
import { roomItemsConfigs } from "../constants/RoomItemsConfigs.js";
function Hero(props) {
  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <ConstrainedOrbitControls cameraPosition={roomItemsConfigs.camera.position} isMobile={props.isMobile} />
            <Lighting lightMode={props.lightMode} />
            <Room />
            <group>
              <Guitar
                scale={roomItemsConfigs.guitar.scale}
                position={roomItemsConfigs.guitar.position}
                rotation={roomItemsConfigs.guitar.rotation}
              />
              <InteractiveLogos lightMode={props.lightMode} />
              <Mac
                scale={roomItemsConfigs.mac.scale}
                position={roomItemsConfigs.mac.position}
                rotation={roomItemsConfigs.mac.rotation}
              />
              <Screen
                scale={roomItemsConfigs.screen.scale}
                position={roomItemsConfigs.screen.position}
                rotation={roomItemsConfigs.screen.rotation}
                setActiveSection={props.setActiveSection}
              />
              <Posters />
              <Speaker
                scale={roomItemsConfigs.speaker.scale}
                position={roomItemsConfigs.speaker.position0}
                rotation={roomItemsConfigs.speaker.rotation0}
              />
              <Speaker
                scale={roomItemsConfigs.speaker.scale}
                position={roomItemsConfigs.speaker.position1}
                rotation={roomItemsConfigs.speaker.rotation1}
              />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Hero;
