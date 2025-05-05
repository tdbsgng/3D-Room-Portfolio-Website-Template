import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const PURPLE_GRAY_COLORS = [
  0x9370db, 0x8a2be2, 0x483d8b, 0x663399, 0x808080, 0x696969, 0xa9a9a9, 0x778899, 0xb19cd9, 0xd8bfd8,
];
const BLUE_WHITE_COLORS = [
  0x00bfff, 0x1e90ff, 0x87cefa, 0xadd8e6, 0xb0e0e6, 0xf0f8ff, 0xe0ffff, 0x00ffff, 0x00ced1, 0xffffff,
];

const TRAIL_GEOMETRY = new THREE.SphereGeometry(0.01, 32, 32);

const PRECOMPUTED_TRAIL_PATTERN = Array.from({ length: 500 }, () => ({
  endPosition: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
  duration: Math.random() * 5,
}));

const FireworkTrail = ({ endPosition, duration = 0.5, lightMode = false }) => {
  const ref = useRef();

  const colorArray = lightMode ? BLUE_WHITE_COLORS : PURPLE_GRAY_COLORS;

  const trailData = useMemo(
    () => ({
      endPosition: [...endPosition],
      material: new THREE.MeshBasicMaterial({
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        transparent: true,
        opacity: 1,
      }),
    }),
    [endPosition, colorArray]
  );

  useEffect(() => {
    if (!ref.current) return;
    ref.current.position.set(0, 0, 0);

    const tl = gsap.timeline();

    tl.to(ref.current.position, {
      x: trailData.endPosition[0],
      y: trailData.endPosition[1],
      z: trailData.endPosition[2],
      duration: duration,
      ease: "power2.out",
    });
    gsap.to(ref.current.material, {
      opacity: 0,
      duration: duration,
      ease: "power1.in",
      onComplete: () => {
        if (ref.current && ref.current.parent) {
          ref.current.parent.remove(ref.current);
        }
      },
    });
    return () => {
      tl.kill();
    };
  }, []);

  return <mesh ref={ref} geometry={TRAIL_GEOMETRY} material={trailData.material} />;
};

const BLUE_WIHTE_TRAILS = PRECOMPUTED_TRAIL_PATTERN.map((pattern, i) => {
  const endPos = [pattern.endPosition[0], pattern.endPosition[1], pattern.endPosition[2]];

  return <FireworkTrail key={`trail-${i}`} endPosition={endPos} duration={pattern.duration} lightMode={true} />;
});
const PURPLE_GRAY_TRAILS = PRECOMPUTED_TRAIL_PATTERN.map((pattern, i) => {
  const endPos = [pattern.endPosition[0], pattern.endPosition[1], pattern.endPosition[2]];

  return <FireworkTrail key={`trail-${i}`} endPosition={endPos} duration={pattern.duration} lightMode={false} />;
});

const Firework = ({ position, lightMode = false }) => {
  const lightRef = useRef();
  const groupRef = useRef();
  const colorArray = lightMode ? BLUE_WHITE_COLORS : PURPLE_GRAY_COLORS;

  useEffect(() => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 100;
    gsap.to(lightRef.current, {
      intensity: 0,
      duration: 1.0,
      ease: "power2.out",
    });

    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      if (lightRef.current) {
        colorIndex = (colorIndex + 1) % colorArray.length;
        lightRef.current.color.set(new THREE.Color(colorArray[colorIndex]));
      } else {
        clearInterval(colorInterval);
      }
    }, 10);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <group ref={groupRef} position={position}>
      <pointLight
        ref={lightRef}
        color={colorArray[Math.floor(Math.random() * colorArray.length)]}
        intensity={100}
        decay={0.5}
        distance={10}
      />
      {lightMode ? BLUE_WIHTE_TRAILS : PURPLE_GRAY_TRAILS}
    </group>
  );
};

export default Firework;
