import { useEffect, useState } from 'react';
export function checkNightTime() {
  const currentHour = new Date().getHours();
  return (currentHour >= 18 || currentHour < 6);
}

export const TimeBasedLighting = () => {
  const [isNightTime, setIsNightTime] = useState(false);

  useEffect(() => {
    setIsNightTime(checkNightTime());

    const intervalId = setInterval(() => {
      setIsNightTime(checkNightTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {isNightTime ? (
        <>
          <pointLight position={[-10, 10, -2]} intensity={1000} distance={100} decay={2} color={'red'} />
          {/* <pointLight position={[-10, 10, -2]} intensity={1000} distance={100} decay={2} color={'purple'} />
          <pointLight position={[10, 10, -2]} intensity={1000} distance={100} decay={2} color={'purple'} /> */}

          <pointLight position={[10, 10, -2]} intensity={1000} distance={100} decay={2} color={'blue'} />
          <pointLight position={[0, 10, -10]} intensity={1000} distance={100} decay={2} color={'purple'} />
        </>
      ) : (
        <>
          <pointLight position={[-10, 10, 0]} intensity={300} distance={100} decay={2} color={'#ffd8a8'} />
          <pointLight position={[10, 10, 0]} intensity={300} distance={100} decay={2} color={'#ffd8a8'} />
          <pointLight position={[0, 10, -10]} intensity={300} distance={100} decay={2} color={'#ffd8a8'} />
          <ambientLight intensity={1} color={'#fff5e1'} />
        </>
      )}
    </>
  );
};
