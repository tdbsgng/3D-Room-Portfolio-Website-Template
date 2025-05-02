import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
const PythonLogo = ({ ...props }) => {
  const { nodes } = useGLTF('models/python.glb');
  const groupRef = useRef();
  const pointLightRef = useRef();
  const spotLightRef = useRef();
  const originalPosition = useRef(props.position || [0, 0, 0]);
  const [hovered, setHovered] = useState(false);
  const [teleported, setTeleported] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(props.position || [0, 0, 0]);
  const [lightIntensity, setLightIntensity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // New state to track animation status

  // Standard rotation animation
  useGSAP(() => {
    gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).to(groupRef.current.rotation, {
      y: hovered ? '+=2' : `+=${Math.PI * 2}`,
      x: hovered ? '+=2' : `-=${Math.PI * 2}`,
      duration: 2.5,
      stagger: { each: 0.15 },
    });
  });

  // Generate random position near the original position
  const generateRandomPosition = () => {
    return [
      originalPosition.current[0] + Math.random(),
      originalPosition.current[1] + Math.random() * 5, // Random height
      originalPosition.current[2] + Math.random(),
    ];
  };

  const portalEffect = (startPos, endPos) => {
    // Set animating flag to true at the start
    setIsAnimating(true);

    // Create a timeline for the portal effect
    const tl = gsap.timeline();

    // 1. First reset the light intensity
    setLightIntensity(0);

    // 2. Light brightens - SLOWER
    tl.to(
      {},
      {
        duration: 1.2, // Slower light brightening
        ease: 'power2.in',
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(0, 5000, this.progress()));
        },
      },
    );

    // 3. Logo scales down to disappear - SLOWER (at the same time)
    tl.to(
      groupRef.current.scale,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        duration: 1.5, // Slower scaling down
        ease: 'power2.in',
        onComplete: () => {
          // Move to new position when invisible
          groupRef.current.position.set(...endPos);
          setCurrentPosition(endPos);
        },
      },
      '<',
    ); // Start at the same time as the previous animation

    tl.to(
      {},
      {
        duration: 1.2, // Slower light brightening
        ease: 'power2.in',
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(0, 5000, this.progress()));
        },
      },
    );

    // 4. Logo scales back up to appear at new position - SLOWER
    tl.to(groupRef.current.scale, {
      x: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      y: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      z: hovered ? 1.2 * (props.scale || 1) : props.scale || 1,
      duration: 3, // Slower scaling up
      ease: 'power2.out',
    });

    // 5. Fade out the light - SLOWER (at the same time)
    tl.to(
      {},
      {
        duration: 1.2, // Slower light fading
        ease: 'power2.out',
        onUpdate: function () {
          setLightIntensity(gsap.utils.interpolate(5000, 0, this.progress()));
        },
        onComplete: () => {
          // Set animating flag to false once the animation completes
          setIsAnimating(false);
        },
      },
      '<',
    ); // Start at the same time as the scale up
  };

  // Handle click event
  const handleClick = () => {
    // Only process the click if not currently animating
    if (!isAnimating) {
      if (teleported) {
        // If already teleported, go back to original position
        portalEffect(currentPosition, originalPosition.current);
        setTeleported(false);
      } else {
        // Generate random position and teleport there
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
        color={props.lightMode ? '#00BFFF' : '#9933FF'}
      />
      <spotLight
        ref={spotLightRef}
        position={currentPosition}
        intensity={lightIntensity * 10}
        angle={0.6}
        penumbra={0.5}
        distance={15}
        color={props.lightMode ? '#00BFFF' : '#BB33FF'}
        castShadow
        target-position={currentPosition}
      />
      <mesh
        position={[currentPosition[0], currentPosition[1], currentPosition[2]]} // Slightly offset for better positioning
        scale={lightIntensity / 100000} // Flattened and slightly scaled for irregularity
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          roughness={0} // Low roughness for better reflection
          metalness={100} // High metalness for strong reflection
        />
      </mesh>
      <group
        ref={groupRef}
        position={currentPosition}
        rotation={[-Math.PI / 2, Math.PI / 6, 0]}
        dispose={null}
        {...props}
        onClick={handleClick}
        scale={(hovered ? 1.2 : 1) * (props.scale || 1)}
        style={{ cursor: isAnimating ? 'default' : 'pointer' }} // Optional: change cursor based on animation state
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Python_Python_0'].geometry}
          material={nodes['Python_Python_0'].material}
          onPointerEnter={() => !isAnimating && setHovered(true)} // Only allow hover effect when not animating
          onPointerLeave={() => setHovered(false)}
        />
      </group>
    </>
  );
};

useGLTF.preload('models/python.glb');

export default PythonLogo;
