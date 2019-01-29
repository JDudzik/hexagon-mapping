import { gridToCubic, gridToAxial, axialToGrid, cubicToGrid, setToCubic, setToGrid } from './conversions';

/*******************/
/* Private Methods */
/*******************/

const neighborPositions = {
  'T':  [0, -1, 1],
  'TR': [1, -1, 0],
  'BR': [1, 0, -1],
  'B':  [0, 1, -1],
  'BL': [-1, 1, 0],
  'TL': [-1, 0, 1],
};

const calculateNeighbor = (cubicCoords, coordModifiers) => ({
  x: cubicCoords.x + coordModifiers[0],
  y: cubicCoords.y + coordModifiers[1],
  z: cubicCoords.z + coordModifiers[2],
});

const calculateToAnchor = (anchorCubicCoords, cubicCoords) => ({
  x: cubicCoords.x - anchorCubicCoords.x,
  y: cubicCoords.y - anchorCubicCoords.y,
  z: cubicCoords.z - anchorCubicCoords.z,
});

const calculateFromAnchor = (anchorCubicCoords, cubicCoords) => ({
  x: cubicCoords.x + anchorCubicCoords.x,
  y: cubicCoords.y + anchorCubicCoords.y,
  z: cubicCoords.z + anchorCubicCoords.z,
});

const rotateCubic = (cubicCoords, clockwise = true) => {
  let coordValues = Object.values(cubicCoords).map(coord => coord * -1);
  if (clockwise) {
    coordValues.push(coordValues.shift());
  }
  if (!clockwise) {
    coordValues.unshift(coordValues.pop());
  }
  return coordValues;
};


/******************/
/* Public Methods */
/******************/

export const getCubicFromAnchor = (anchorCoords, coords, returnGrid = true) => {
  const anchorCubicCoords = setToCubic(anchorCoords);
  const cubicCoords = setToCubic(coords);
  const newCubicCoords = calculateToAnchor(anchorCubicCoords, cubicCoords);
  if (returnGrid) {
    return setToGrid(newCubicCoords);
  }
  return setToCubic(newCubicCoords);
};

export const getNeighbor = (coords, neighborPosition, returnGrid = true) => {
  const cubicCoords = setToCubic(coords);
  const neighborCubic = calculateNeighbor(cubicCoords, neighborPositions[neighborPosition]);
  if (returnGrid) {
    return setToGrid(neighborCubic);
  }
  return setToCubic(neighborCubic);
};

export const getAllNeighbors = (coords, returnGrid = true) => {
  return Object.keys(neighborPositions).map(neighborPosition => getNeighbor(coords, neighborPosition, returnGrid));
};

export const rotateNeighbors = (anchorCoords, returnGrid = true, initialNeighbor = 'T', rotationCount = 6, clockwise = true) => {
  const anchorCubicCoords = setToCubic(anchorCoords);
  const rotatedGridNeighbors = [];
  let currentNeighborCoords = rotateCubic(neighborPositions[initialNeighbor], clockwise);
  for (let i = 0; i < rotationCount; i++) {
    const neighborCoordsAsObject = {
      x: currentNeighborCoords[0],
      y: currentNeighborCoords[1],
      z: currentNeighborCoords[2],
    };
    rotatedGridNeighbors.push({
      // TODO: Add original coords for easier comparision
      rotatedCoords: setToGrid(calculateFromAnchor(anchorCubicCoords, neighborCoordsAsObject)),
    });
    currentNeighborCoords = rotateCubic(currentNeighborCoords, clockwise);
  }
  if (!returnGrid) {
    return rotatedGridNeighbors.map(gridCoords => setToCubic(gridCoords));
  }
  return rotatedGridNeighbors;
};
