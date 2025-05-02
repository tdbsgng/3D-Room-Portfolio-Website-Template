import { useTexture } from "@react-three/drei";
import { useMemo, useState, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import { Float } from "@react-three/drei";

import PythonLogo from "../components/PythonLogo.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import CppLogo from "../components/CppLogo.jsx";
import { Vector3 } from "three";
import {
  horizontalPosterPath,
  verticalPosterPath,
  horizontalPosterConfigs,
  verticalPosterConfigs,
} from "../constants/constants.js";
export const Room = (props) => {
  const { scene } = useGLTF("/models/room.glb");
  const objectConfigs = props.objectConfigs;
  return (
    <group>
      <Clone object={scene} position={objectConfigs.roomPosition} scale={objectConfigs.roomScale} />
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
      <mesh position={[0, 0.22, 0.27]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.001]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <Clone object={scene} />
    </group>
  );
};

export const Screen = (props) => {
  const texture = useTexture("./assets/image/screen.png");
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

  // This handler is for the background plane to reset the active index
  const handleBackgroundClick = () => {
    setActiveIndex(null);
  };

  const handleSectionClick = (index, e) => {
    e.stopPropagation();

    if (activeIndex === index) {
      // Second click on the same mesh
      props.setActiveSection([sections[index].name, 0]);
      setActiveIndex(null);
    } else {
      // First click or clicked different mesh
      setActiveIndex(index);
    }
  };

  return (
    <group {...props}>
      {/* Main background mesh with click handler to reset */}
      <mesh ref={mainMeshRef} onClick={handleBackgroundClick}>
        <planeGeometry args={geometryArgs} />
        <meshStandardMaterial map={texture} emissive={"#fff"} emissiveMap={texture} />
      </mesh>

      {sections.map((section, index) => (
        <mesh
          key={index}
          position={section.position}
          onClick={(e) => {
            if (props.isMobile) {
              props.setActiveSection([sections[index].name, 0]);
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
  const objectConfigs = props.objectConfigs;
  return (
    <>
      <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
        <group position={objectConfigs.logoPosition}>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <CppLogo
              scale={objectConfigs.cppLogoScale * objectConfigs.logoScale}
              position={objectConfigs.cppLogoPosition}
              lightMode={props.lightMode}
            />
          </Float>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <ReactLogo
              scale={objectConfigs.reactLogoScale * objectConfigs.logoScale}
              position={objectConfigs.reactLogoPosition}
              lightMode={props.lightMode}
            />
          </Float>
          <Float speed={1} floatIntensity={1} rotationIntensity={0.5}>
            <PythonLogo
              scale={objectConfigs.pythonLogoScale * objectConfigs.logoScale}
              position={objectConfigs.pythonLogoPosition}
              lightMode={props.lightMode}
            />
          </Float>
        </group>
      </Float>
    </>
  );
};
export const Posters = (props) => {
  const Poster = (props) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
    const [position, setPosition] = useState([0, 0, 0]);

    const texture = useTexture(props.texturePath);

    useEffect(() => {
      // Calculate the dimensions and position of the poster based on the texture size
      if (texture && texture.image) {
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
      }
    }, [texture]);
    if (!texture || !texture.image) return null;
    return (
      <group position={position} {...props}>
        {/* Frame */}
        {/* <mesh>
            <boxGeometry args={[dimensions.width * 1.1, dimensions.height * 1.1, 0.05]} />
            <meshStandardMaterial color="#444" />
          </mesh> */}

        {/* Poster */}
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[dimensions.width, dimensions.height, 0.2]} />
          <meshStandardMaterial
            map={texture}
            emissive={"#fff"}
            emissiveMap={texture}
            emissiveIntensity={!props.lightMode * 2}
          />
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
          leftTop={verticalPosterConfigs.leftTop[index]}
          rightTop={verticalPosterConfigs.rightTop[index]}
        />
      ))}
      {horizontalPosterPath.map((texturePath, index) => (
        <Poster
          key={`h-poster-${index}`}
          texturePath={texturePath}
          leftTop={horizontalPosterConfigs.leftTop[index]}
          rightTop={horizontalPosterConfigs.rightTop[index]}
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
