import { useRef, useState, useEffect } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { checkNightTime } from './TimeBasedLighting';
const CppLogo = (props) => {
  const { nodes, materials } = useGLTF('models/cpp.glb');
  const groupRef = useRef();
  const lightRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  const initialRotation = [-Math.PI / 2, -Math.PI / 12, 0];
  const meshRef = useRef();
  const [isNightTime, setIsNightTime] = useState(false);

  useEffect(() => {
    setIsNightTime(checkNightTime());

    const intervalId = setInterval(() => {
      setIsNightTime(checkNightTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    let newSpeed = 0.2 + 0.05 * (newClickCount - 1);
    newSpeed = newSpeed > 1.5 ? 1.5 : newSpeed;
    setRotationSpeed(newSpeed);
    setIsRotating(true);
  };

  useFrame(() => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed;

      // 動態調整光源亮度
      if (lightRef.current) {
        lightRef.current.intensity = rotationSpeed * 1000;
      }

      if (rotationSpeed > 0) {
        setRotationSpeed((speed) => {
          const newSpeed = speed - 0.005;

          if (newSpeed <= 0) {
            setIsRotating(false);
            setClickCount(0);

            const currentRotation = meshRef.current.rotation.z % (Math.PI * 2);
            const normalizedRotation = currentRotation < 0 ? currentRotation + Math.PI * 2 : currentRotation;
            const initialZ = initialRotation[2] % (Math.PI * 2);
            const normalizedInitialZ = initialZ < 0 ? initialZ + Math.PI * 2 : initialZ;

            let distanceForward = normalizedInitialZ - normalizedRotation;
            if (distanceForward < 0) distanceForward += Math.PI * 2;

            let distanceBackward = normalizedRotation - normalizedInitialZ;
            if (distanceBackward < 0) distanceBackward += Math.PI * 2;

            const targetZ =
              meshRef.current.rotation.z + (distanceForward <= distanceBackward ? distanceForward : -distanceBackward);

            gsap.to(meshRef.current.rotation, {
              z: targetZ,
              duration: 0.5,
              ease: 'power2.out',
            });

            return 0;
          }

          return newSpeed;
        });
      }
    } else {
      lightRef.current.intensity = 0;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <pointLight ref={lightRef} position={[0, 3, 3]} intensity={0} distance={10} decay={2} color={isNightTime?'#87CEFA':'#AA33FF'} />
      <group dispose={null}>
        <mesh
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          ref={meshRef}
          geometry={nodes['C++_C++_0'].geometry}
          material={Object.values(materials)[0]}
          rotation={initialRotation}
          scale={hovered ? [1.2, 2.4, 1.2] : [1, 2, 1]}
          onClick={handleClick}></mesh>
      </group>
    </group>
  );
};

useGLTF.preload('models/cpp.glb');

export default CppLogo;
