export const roomItemsConfigs = {
  verticalPoster: {
    leftTop: [
      [-4.7, 7, -11.7],
      [-3.8, 8, -11.7],
      [0.6, 7.6, -11.7],
      [6.7, 7.6, -11.7],
    ],
    rightTop: [
      [-7.9, 7, -11.7],
      [-0.6, 8, -11.7],
      [3.2, 7.6, -11.7],
      [4.1, 7.6, -11.7],
    ],
  },
  horizontalPoster: { leftTop: [[-13, 8, -3]], rightTop: [[-13, 8, -9]] },
  reactLogo: { scale: 0.2, position: [-0.5, 0, -9] },
  pythonLogo: { scale: 0.01, position: [0, 1, -6] },
  cppLogo: { scale: 0.01, position: [0.5, 0, -8] },
  interactiveLogo: { scale: 1.5, position: [8, 0, 1] },
  room: { scale: 9, position: [5, 0, -10] },
  guitar: { scale: 10, position: [-11, -10, -7], rotation: [0, Math.PI / 6, 0] },
  mac: { scale: 9, position: [0, -2.44, -7], rotation: [0, Math.PI, 0] },
  screen: { scale: 4, position: [-0.12, 1.75, -9.64], rotation: [-Math.PI / 36, 0, 0] },
  speaker: {
    scale: 10,
    position0: [6.5, -2.5, -10],
    position1: [-6.5, -2.5, -10],
    rotation0: [0, -Math.PI / 6, 0],
    rotation1: [0, Math.PI / 6, 0],
  },
  camera: { position: [0, 0, 10] },
};
