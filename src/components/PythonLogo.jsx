import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
const PythonLogo = ({ ...props }) => {
  const { nodes } = useGLTF("models/python.glb");
  const groupRef = useRef();
  const pointLightRef = useRef();
  const spotLightRef = useRef();
  const originalPosition = useRef(props.position || [0, 0, 0]);
  const [hovered, setHovered] = useState(false);
  const [teleported, setTeleported] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(props.position || [0, 0, 0]);
  const [lightIntensity, setLightIntensity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(() => {
    gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).to(groupRef.current.rotation, {
      y: hovered ? "+=2" : `+=${Math.PI * 2}`,
      x: hovered ? "+=2" : `-=${Math.PI * 2}`,
      duration: 2.5,
      stagger: { each: 0.15 },
    });
  });

  const generateRandomPosition = () => {
    return [originalPosition.current[0], originalPosition.current[1] + Math.random() * 5, originalPosition.current[2]];
  };

  const portalEffect = (endPos) => {
    setIsAnimating(true);

    const tl = gsap.timeline();

    setLightIntensity(0);

    tl.to(
      {},
      {
        duration: 1.2,
        ease: "power2.in",
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(0, 5000, this.progress()));
        },
      }
    );

    tl.to(
      groupRef.current.scale,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        duration: 1.5,
        ease: "power2.in",
        onComplete: () => {
          groupRef.current.position.set(...endPos);
          setCurrentPosition(endPos);
        },
      },
      "<"
    );

    tl.to(
      {},
      {
        duration: 1.2,
        ease: "power2.in",
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(0, 5000, this.progress()));
        },
      }
    );

    tl.to(groupRef.current.scale, {
      x: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      y: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      z: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      duration: 3,
      ease: "power2.out",
    });

    tl.to(
      {},
      {
        duration: 1.2,
        ease: "power2.out",
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(5000, 0, this.progress()));
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      },
      "<"
    );
  };

  const handleClick = () => {
    if (!isAnimating) {
      if (teleported) {
        portalEffect(currentPosition, originalPosition.current);
        setTeleported(false);
      } else {
        const randomPos = generateRandomPosition();
        portalEffect(currentPosition, randomPos);
        setTeleported(true);
      }
    }
  };

  return (
    <>
      <pointLight
        ref={pointLightRef}
        position={currentPosition}
        intensity={lightIntensity}
        distance={10}
        color={props.lightMode ? "#00BFFF" : "#9933FF"}
      />
      <spotLight
        ref={spotLightRef}
        position={currentPosition}
        intensity={lightIntensity * 10}
        angle={0.6}
        penumbra={0.5}
        distance={15}
        color={props.lightMode ? "#00BFFF" : "#BB33FF"}
        castShadow
        target-position={currentPosition}
      />
      <mesh position={[currentPosition[0], currentPosition[1], currentPosition[2]]} scale={lightIntensity / 100000}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial roughness={0} metalness={100} />
      </mesh>
      <group
        ref={groupRef}
        position={currentPosition}
        rotation={[-Math.PI / 2, Math.PI / 6, 0]}
        dispose={null}
        {...props}
        onClick={handleClick}
        scale={(hovered ? 1.2 : 1) * (props.scale || 1)}
        style={{ cursor: isAnimating ? "default" : "pointer" }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Python_Python_0"].geometry}
          material={nodes["Python_Python_0"].material}
          onPointerEnter={() => !isAnimating && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        />
      </group>
    </>
  );
};

useGLTF.preload("models/python.glb");

export default PythonLogo;
