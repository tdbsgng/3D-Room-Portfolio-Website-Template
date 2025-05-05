export const Lighting = (props) => {
  return (
    <>
      {props.lightMode ? (
        <>
          <pointLight position={[-10, 10, -2]} intensity={1000} distance={100} decay={2} color={"red"} />
          <pointLight position={[10, 10, -2]} intensity={1000} distance={100} decay={2} color={"blue"} />
          <pointLight position={[0, 10, -10]} intensity={1000} distance={100} decay={2} color={"purple"} />
        </>
      ) : (
        <>
          <pointLight position={[-10, 10, 0]} intensity={300} distance={100} decay={2} color={"#ffd8a8"} />
          <pointLight position={[10, 10, 0]} intensity={300} distance={100} decay={2} color={"#ffd8a8"} />
          <pointLight position={[0, 10, -10]} intensity={300} distance={100} decay={2} color={"#ffd8a8"} />
        </>
      )}
    </>
  );
};
