import { useGLTF } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import Firework from './firework';

const ReactLogo = (props) => {
  const { nodes } = useGLTF('models/react.glb');
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const originalPosition = useRef(props.position || [0, 0, 0]);
  const velocity = useRef(0);
  const acceleration = 0.05;
  const gravity = 0.001;
  const [fireworks, setFireworks] = useState([]);
  const nextFireworkId = useRef(0);
  const reachedTargetHeight = useRef(false);
  const targetHeight = 5;


  const handleClick = () => {
    // Add extra power for consecutive hits
    if (velocity.current === 0) {
      velocity.current = acceleration;
    } else {
      velocity.current += acceleration;
    }
    // Reset the height tracking when clicked
    reachedTargetHeight.current = false;
  };

  // Animation frame hook
  useFrame(() => {
    if (!groupRef.current) return;

    const currentPos = groupRef.current.position;

    // Apply gravity and update position
    velocity.current -= gravity;
    currentPos.y += velocity.current;

    // Check if the logo has fallen below its original position
    if (currentPos.y <= originalPosition.current[1]) {
      currentPos.y = originalPosition.current[1];
      velocity.current = 0;
      reachedTargetHeight.current = false;
    }

    // Create fireworks when reaching target height while moving upward
    if (currentPos.y >= targetHeight && !reachedTargetHeight.current && velocity.current > 0) {
      const id = nextFireworkId.current++;
      velocity.current = -0.1;
      setFireworks((prev) => [
        ...prev,
        {
          id,
          position: [currentPos.x, currentPos.y, currentPos.z],
          time: Date.now(),
        },
      ]);
      reachedTargetHeight.current = true;
      
      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== id));
      }, 2000);
    }
  });

  // Save original position on mount
  useEffect(() => {
    if (props.position) {
      originalPosition.current = [...props.position];
      if (groupRef.current) {
        groupRef.current.position.set(...props.position);
      }
    }
  }, [props.position]);

  return (
    <>
      {fireworks.map((fw) => (
        <Firework key={fw.id} position={fw.position} trailCount={500} lightMode={props.lightMode}/>
      ))}
      
      {/* Render react logo */}
      <group
        ref={groupRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
        {...props}
        scale={(hovered ? 1.2 : 1) * (props.scale || 1)}
        dispose={null}
        rotation={[-Math.PI, 0, 0]}>
        {Object.entries(nodes).map(([name, node]) =>
          node.type === 'Mesh' ? (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material}
              scale={name === 'Backdrop_Material001_0' ? [1.4, 1.4, 1.4] : [0.2, 0.2, 0.2]}
            />
          ) : null,
        )}
      </group>
    </>
  );
};

useGLTF.preload('models/react.glb');

export default ReactLogo;