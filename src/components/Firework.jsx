import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Preloaded color arrays
const PURPLE_GRAY_COLORS = [
  0x9370db, 0x8a2be2, 0x483d8b, 0x663399, 0x808080, 0x696969, 0xa9a9a9, 0x778899, 0xb19cd9, 0xd8bfd8,
];

// New lightning blue-white color array including 00BFFF
const LIGHTNING_BLUE_WHITE_COLORS = [
  0x00bfff, 0x1e90ff, 0x87cefa, 0xadd8e6, 0xb0e0e6, 0xf0f8ff, 0xe0ffff, 0x00ffff, 0x00ced1, 0xffffff,
];

// Preloaded geometries
const TRAIL_GEOMETRY = new THREE.SphereGeometry(0.01, 32, 32);

// Firework trail component with lightMode parameter
const FireworkTrail = ({ position, endPosition, duration = 0.5, lightMode = false }) => {
  const ref = useRef();

  // Select color array based on lightMode parameter
  const colorArray = lightMode ? LIGHTNING_BLUE_WHITE_COLORS : PURPLE_GRAY_COLORS;

  // Precompute values
  const trailData = useMemo(
    () => ({
      startPosition: [...position],
      endPosition: [...endPosition],
      // Pre-create the material with selected color scheme
      material: new THREE.MeshBasicMaterial({
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        transparent: true,
        opacity: 1,
      }),
    }),
    [position, endPosition, colorArray],
  );

  useEffect(() => {
    if (!ref.current) return;

    // Set initial position
    ref.current.position.set(trailData.startPosition[0], trailData.startPosition[1], trailData.startPosition[2]);

    // Create GSAP timeline for position animation
    const tl = gsap.timeline();

    // Animate position
    tl.to(ref.current.position, {
      x: trailData.endPosition[0],
      y: trailData.endPosition[1],
      z: trailData.endPosition[2],
      duration: duration,
      ease: 'power2.out',
    });

    // Animate opacity
    gsap.to(ref.current.material, {
      opacity: 0,
      duration: duration,
      ease: 'power1.in',
      onComplete: () => {
        // Optional: Remove the mesh from scene when animation is complete
        if (ref.current && ref.current.parent) {
          ref.current.parent.remove(ref.current);
        }
      },
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return <mesh ref={ref} position={position} geometry={TRAIL_GEOMETRY} material={trailData.material} />;
};

// Advanced firework explosion component with central light
const Firework = ({ position, trailCount = 500, lightMode = false }) => {
  // Reference for the central light
  const lightRef = useRef();
  const groupRef = useRef();

  // Select color array based on lightMode parameter
  const colorArray = lightMode ? LIGHTNING_BLUE_WHITE_COLORS : PURPLE_GRAY_COLORS;

  // Precompute data for the light
  const lightData = useMemo(
    () => ({
      color: colorArray[Math.floor(Math.random() * colorArray.length)],
      baseIntensity: 100,
    }),
    [colorArray],
  );

  // Precompute trails data
  const { trails } = useMemo(() => {
    const trailsArray = [];

    // Create trails
    for (let i = 0; i < trailCount; i++) {
      const endPos = [
        position[0] + (Math.random() - 0.5) * 10,
        position[1] + (Math.random() - 0.5) * 10,
        position[2] + (Math.random() - 0.5) * 10,
      ];

      trailsArray.push(
        <FireworkTrail
          key={`trail-${i}`}
          position={position}
          endPosition={endPos}
          duration={Math.random()*5}
          lightMode={lightMode}
        />,
      );
    }

    return { trails: trailsArray };
  }, [position, trailCount, lightMode]);

  // Handle light animation with GSAP
  useEffect(() => {
    if (!lightRef.current) return;

    // Set initial properties
    lightRef.current.intensity = lightData.baseIntensity;

    // Fade out the light
    gsap.to(lightRef.current, {
      intensity: 0,
      duration: 1.0,
      ease: 'power2.out',
    });

    // Color animation
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      if (lightRef.current) {
        colorIndex = (colorIndex + 1) % colorArray.length;
        lightRef.current.color.set(new THREE.Color(colorArray[colorIndex]));
      } else {
        clearInterval(colorInterval);
      }
    }, 2);

    // Cleanup
    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <group ref={groupRef}>
      <pointLight
        ref={lightRef}
        position={position}
        color={lightData.color}
        intensity={lightData.baseIntensity}
        decay={0.5}
        distance={10}
      />
      {trails}
    </group>
  );
};

export default Firework;
