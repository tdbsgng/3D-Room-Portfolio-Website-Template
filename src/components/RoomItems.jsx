import { useTexture } from "@react-three/drei";
import { useMemo, useState, useRef, useEffect } from "react";
import { useGLTF, Clone } from "@react-three/drei";
import { Float } from "@react-three/drei";

import PythonLogo from "../components/PythonLogo.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import CppLogo from "../components/CppLogo.jsx";
import { Vector3 } from "three";
import { horizontalPosterPath, verticalPosterPath } from "../constants/Info.js";
import { roomItemsConfigs } from "../constants/RoomItemsConfigs.js";

export const Room = () => {
  const { scene } = useGLTF("/models/room.glb");
  return (
    <group>
      <Clone object={scene} position={roomItemsConfigs.room.position} scale={roomItemsConfigs.room.scale} />
      {/* wall patch */}
      <mesh position={[0, 0, -13]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[30, 30, 0.01]} />
        <meshPhysicalMaterial color="#333333" roughness={1} metalness={0} clearcoat={1} clearcoatRoughness={1} />
      </mesh>
      <mesh position={[-13.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[30, 30, 0.01]} />
        <meshPhysicalMaterial color="#333333" roughness={1} metalness={0} clearcoat={1} clearcoatRoughness={1} />
      </mesh>
      <mesh position={[13.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[30, 30, 0.01]} />
        <meshPhysicalMaterial color="#333333" roughness={1} metalness={0} clearcoat={1} clearcoatRoughness={1} />
      </mesh>
    </group>
  );
};
export const Guitar = (props) => {
  const { scene } = useGLTF("/models/guitar.glb");

  return (
    <group {...props}>
      <Clone object={scene} />
    </group>
  );
};

export const Mac = (props) => {
  const { scene } = useGLTF("/models/mac.glb");

  return (
    <group {...props}>
      <directionalLight position={[0, 0.1, -5]} intensity={0.5} />

      {/* avoid reflection */}
      <mesh position={[0, 0.22, 0.27]}>
        <boxGeometry args={[0.9, 0.05, 0.001]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <Clone object={scene} />
    </group>
  );
};

export const Screen = (props) => {
  const texture = useTexture("./assets/image/screen.png");
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  const [activeIndex, setActiveIndex] = useState(null);
  const mainMeshRef = useRef();

  const geometryArgs = useMemo(() => {
    if (!texture.image) return [1, 1];
    const { width, height } = texture.image;
    const aspect = width / height;
    return [aspect, 1];
  }, [texture.image]);

  const sections = [
    { position: [-0.52, 0.15, 0.01], name: "About Me" },
    { position: [-0.11, 0.15, 0.01], name: "Education" },
    { position: [0.3, 0.15, 0.01], name: "Projects" },
    { position: [0.7, 0.15, 0.01], name: "Experience" },
  ];

  const handleBackgroundClick = () => {
    setActiveIndex(null);
  };

  const handleSectionClick = (index, e) => {
    e.stopPropagation();

    if (activeIndex === index) {
      props.setActiveSection(sections[index].name);
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <group {...props}>
      <mesh ref={mainMeshRef} onClick={handleBackgroundClick}>
        <planeGeometry args={geometryArgs} />
        <meshStandardMaterial map={texture} emissive={"#fff"} emissiveMap={texture} />
      </mesh>

      {sections.map((section, index) => (
        <mesh
          key={index}
          position={section.position}
          onClick={(e) => {
            if (isTouchDevice) {
              props.setActiveSection(sections[index].name);
              return;
            }
            handleSectionClick(index, e);
          }}
        >
          <planeGeometry args={[0.38, 0.38]} />
          <meshStandardMaterial
            color={activeIndex === index ? "#0000ff" : "#ffffff"}
            opacity={activeIndex === index ? 0.5 : 0}
            transparent={true}
            visible={activeIndex === index}
          />
        </mesh>
      ))}
    </group>
  );
};
export const Speaker = (props) => {
  const { scene } = useGLTF("/models/speaker.glb");
  return (
    <group {...props}>
      <Clone object={scene} />
    </group>
  );
};

export const InteractiveLogos = (props) => {
  return (
    <>
      <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
        <group position={roomItemsConfigs.interactiveLogo.position}>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <CppLogo
              scale={roomItemsConfigs.cppLogo.scale * roomItemsConfigs.interactiveLogo.scale}
              position={roomItemsConfigs.cppLogo.position}
              lightMode={props.lightMode}
            />
          </Float>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <ReactLogo
              scale={roomItemsConfigs.reactLogo.scale * roomItemsConfigs.interactiveLogo.scale}
              position={roomItemsConfigs.reactLogo.position}
              lightMode={props.lightMode}
            />
          </Float>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <PythonLogo
              scale={roomItemsConfigs.pythonLogo.scale * roomItemsConfigs.interactiveLogo.scale}
              position={roomItemsConfigs.pythonLogo.position}
              lightMode={props.lightMode}
            />
          </Float>
        </group>
      </Float>
    </>
  );
};
export const Posters = () => {
  const Poster = (props) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
    const [position, setPosition] = useState([0, 0, 0]);
    const [isReady, setIsReady] = useState(false);

    const texture = useTexture(props.texturePath);

    useEffect(() => {
      if (texture && texture.image && !isReady) {
        const imgWidth = texture.image.width;
        const imgHeight = texture.image.height;
        const aspectRatio = imgWidth / imgHeight;

        const leftTopPos = props.leftTop;
        const rightTopPos = props.rightTop;

        const leftTopVec = new Vector3(leftTopPos[0], leftTopPos[1], leftTopPos[2]);
        const rightTopVec = new Vector3(rightTopPos[0], rightTopPos[1], rightTopPos[2]);
        const width = leftTopVec.distanceTo(rightTopVec);

        const height = width / aspectRatio;

        const centerX = (leftTopPos[0] + rightTopPos[0]) / 2;
        const centerY = leftTopPos[1] - height / 2;
        const centerZ = (leftTopPos[2] + rightTopPos[2]) / 2;

        setPosition([centerX, centerY, centerZ]);
        setDimensions({ width, height });
        setIsReady(true);
      }
    }, [texture, props.leftTop, props.rightTop, isReady]);
    // Don't render anything until the texture is loaded and calculations are done
    if (!texture || !texture.image || !isReady) return null;
    return (
      <group position={position} {...props}>
        {/* Poster */}
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[dimensions.width, dimensions.height, 0.2]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    );
  };

  return (
    <>
      {verticalPosterPath.map((texturePath, index) => (
        <Poster
          key={`v-poster-${index}`}
          texturePath={texturePath}
          leftTop={roomItemsConfigs.verticalPoster.leftTop[index]}
          rightTop={roomItemsConfigs.verticalPoster.rightTop[index]}
        />
      ))}
      {horizontalPosterPath.map((texturePath, index) => (
        <Poster
          key={`h-poster-${index}`}
          texturePath={texturePath}
          leftTop={roomItemsConfigs.horizontalPoster.leftTop[index]}
          rightTop={roomItemsConfigs.horizontalPoster.rightTop[index]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
    </>
  );
};

useGLTF.preload("/models/room.glb");
useGLTF.preload("/models/guitar.glb");
useGLTF.preload("/models/mac.glb");
useGLTF.preload("/models/speaker.glb");
