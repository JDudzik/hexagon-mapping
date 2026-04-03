export const cubicArrayToObject = cubicArray => ({
  x: cubicArray[0],
  y: cubicArray[1],
  z: cubicArray[2],
});

export const cubicRound = (cubicCoords) => {
  let rx = Math.round(cubicCoords.x);
  let ry = Math.round(cubicCoords.y);
  let rz = Math.round(cubicCoords.z);
  const x_diff = Math.abs(rx - cubicCoords.x);
  const y_diff = Math.abs(ry - cubicCoords.y);
  const z_diff = Math.abs(rz - cubicCoords.z);

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry - rz;
  } else if (y_diff > z_diff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return { x: rx, y: ry, z: rz };
};
