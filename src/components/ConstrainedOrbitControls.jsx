import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
const ConstrainedOrbitControls = (props) => {
  const controlsRef = useRef();
  const idleTimeoutRef = useRef(null);
  const { camera } = useThree();

  const initialPosition = props.cameraPosition;
  const initialTarget = [0, 0, 0];
  const idleTimeout = 2000;
  const resetCamera = () => {
    if (controlsRef.current) {
      gsap.to(camera.position, {
        x: initialPosition[0],
        y: initialPosition[1],
        z: initialPosition[2],
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
        },
      });
    }
  };

  const handleInteraction = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = setTimeout(() => {
      resetCamera();
    }, idleTimeout);
  };

  useEffect(() => {
    if (initialPosition) {
      camera.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);
    }
  }, [initialPosition]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(initialTarget[0], initialTarget[1], initialTarget[2]);
      controlsRef.current.update();

      controlsRef.current.minPolarAngle = Math.PI / 4;
      controlsRef.current.maxPolarAngle = Math.PI / 1.5;

      controlsRef.current.minAzimuthAngle = props.isMobile ? -Math.PI / 3 : -Math.PI / 6;
      controlsRef.current.maxAzimuthAngle = props.isMobile ? Math.PI / 3 : Math.PI / 6;

      controlsRef.current.minDistance = 1; 
      controlsRef.current.maxDistance = 10; 
      controlsRef.current.addEventListener("change", handleInteraction);
      window.addEventListener("pointerdown", handleInteraction);

      idleTimeoutRef.current = setTimeout(() => {
        resetCamera();
      }, idleTimeout);
    }

    return () => {
      if (controlsRef.current) {
        controlsRef.current.removeEventListener("change", handleInteraction);
        window.removeEventListener("pointerdown", handleInteraction);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />;
};

export default ConstrainedOrbitControls;
