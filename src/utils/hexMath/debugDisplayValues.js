import { gridToCubic, setToCubic, setToGrid } from './conversions';
import { getCubicByAnchor, getNeighbor, getAllNeighbors, rotateNeighbors } from './interactions';
import { getGridHexes } from './grid';

export const showCubicWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicByAnchor(anchorGridCoords, gridCoords, false);
    hexData.topper = `${anchoredCubicCoords.x}, ${anchoredCubicCoords.y}, ${anchoredCubicCoords.z}`;
    return hexData;
  });
  updateHexes(newHexes);
};

export const setNeighborsToBrown = (getHex, updateHexes, gridCoords) => {
  const allNeighbors = getAllNeighbors(gridCoords)
    .map(neighborCoords => {
      const neighborHex = getHex(neighborCoords);
      if (!!neighborHex) { neighborHex.hexData.color = 'brown'; }
      return neighborHex;
    });
  updateHexes([...allNeighbors]);
};

export const rotateAllNeighbors = (anchorCoords, getHex, updateHexes, clockwise = true) => {
  const rotatedGridCoords = rotateNeighbors(anchorCoords, clockwise, 'T', 6);
  // console.log(rotatedGridCoords);
  const rotatedHexData = rotatedGridCoords.map(coords => ({
    gridCoords: coords.initialCoords,
    hexData: getHex(coords.rotatedCoords).hexData,
  }));
  updateHexes(rotatedHexData.filter(hex => !!hex.hexData));
};










const getPointDifferences = (p0, p1) => {
  return {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
    z: p1.z - p0.z,
  };
};

const getDiagonalDistance = (p0, p1) => Math.max(Math.abs(p0.x - p1.x), Math.abs(p0.y - p1.y), Math.abs(p0.z - p1.z));

const cubicRound = (cubicCoords) => {
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

const lerpPoints = (p0, p1, t) => ({
  x: p0.x + t * (p1.x - p0.x),
  y: p0.y + t * (p1.y - p0.y),
  z: p0.z + t * (p1.z - p0.z),
});

export const interpolating = (p0, p1, updateHexes) => {
  const diagonalDistance = getDiagonalDistance(p0, setToCubic(p1));
  console.log(diagonalDistance);
  const hexes = [];

  for (let step = 0; step <= diagonalDistance; step++) {
    const t = diagonalDistance === 0 ? 0.0 : step / diagonalDistance;
    const lerpedPoints = lerpPoints(p0, setToCubic(p1), t);
    hexes.push(cubicRound(lerpedPoints));
  }

  updateHexes(hexes.map(coords => ({
    gridCoords: setToGrid(coords),
    hexData: {color: 'tan'},
  })));
};
