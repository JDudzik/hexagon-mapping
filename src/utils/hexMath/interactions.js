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

const cubicArrayToObject = (cubicArray) => ({
  x: cubicArray[0],
  y: cubicArray[1],
  z: cubicArray[2],
});

const rotateCubic = (cubicCoords, clockwise = true) => {
  let coordValues = Object.values(cubicCoords).map(coord => coord * -1);
  if (clockwise) {
    coordValues.unshift(coordValues.pop());
  }
  if (!clockwise) {
    coordValues.push(coordValues.shift());
  }
  return coordValues;
};


/******************/
/* Public Methods */
/******************/

export const getCubicByAnchor = (anchorCoords, coords, returnGrid = true) => {
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

export const rotateNeighbors = (anchorCoords, clockwise = true, initialNeighbor = 'T', rotationCount = 6) => {
  const anchorCubicCoords = setToCubic(anchorCoords);
  const rotatedGridNeighbors = [];
  let previousNeighborCoords = neighborPositions[initialNeighbor];
  let currentNeighborCoords = rotateCubic(neighborPositions[initialNeighbor], clockwise);
  
  for (let i = 0; i < rotationCount; i++) {
    rotatedGridNeighbors.push({
      initialCoords: setToGrid(calculateFromAnchor(anchorCubicCoords, cubicArrayToObject(previousNeighborCoords))),
      rotatedCoords: setToGrid(calculateFromAnchor(anchorCubicCoords, cubicArrayToObject(currentNeighborCoords))),
    });
    previousNeighborCoords = currentNeighborCoords;
    currentNeighborCoords = rotateCubic(currentNeighborCoords, clockwise);
  }
  return rotatedGridNeighbors;
};
