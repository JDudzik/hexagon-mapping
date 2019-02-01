export const cubicArrayToObject = (cubicArray) => ({
  x: cubicArray[0],
  y: cubicArray[1],
  z: cubicArray[2],
});

export const cubicRound = (cubicCoords) => {
  var rx = Math.round(cubicCoords.x);
  var ry = Math.round(cubicCoords.y);
  var rz = Math.round(cubicCoords.z);
  var x_diff = Math.abs(rx - cubicCoords.x);
  var y_diff = Math.abs(ry - cubicCoords.y);
  var z_diff = Math.abs(rz - cubicCoords.z);

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry-rz;
  }
  else if (y_diff > z_diff) {
    ry = -rx-rz;
  }
  else {
    rz = -rx-ry;
  }

  return {x: rx, y: ry, z: rz};
};
