import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
const Presenter = (props) => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI} />
      <directionalLight position={[10, 10, 5]} />
      <Center>
        <Suspense fallback={<CanvasLoader />}></Suspense>
      </Center>
      <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
    </Canvas>
  );
};
export default Presenter;
