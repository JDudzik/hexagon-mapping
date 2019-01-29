import { gridToCubic, gridToAxial, axialToGrid, cubicToGrid, isGridCoords } from './conversions';

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


/******************/
/* Public Methods */
/******************/

export const getCubicFromGridAnchor = (anchorGridCoords, gridCoords) => {
  const cubicCoords = gridToCubic(gridCoords);
  const anchorCubicCoords = gridToCubic(anchorGridCoords);

  return {
    x: cubicCoords.x - anchorCubicCoords.x,
    y: cubicCoords.y - anchorCubicCoords.y,
    z: cubicCoords.z - anchorCubicCoords.z,
  };
};

export const getCubicFromCubicAnchor = (anchorCubicCoords, gridCoords) => {
  const cubicCoords = gridToCubic(gridCoords);

  return {
    x: cubicCoords.x - anchorCubicCoords.x,
    y: cubicCoords.y - anchorCubicCoords.y,
    z: cubicCoords.z - anchorCubicCoords.z,
  };
};


export const getNeighbor = (coords, neighborPosition, returningGrid = true) => {
  const cubicCoords = isGridCoords(coords) ? gridToCubic(coords) : coords;
  const neighborCubic = calculateNeighbor(cubicCoords, neighborPositions[neighborPosition]);
  if (returningGrid) {
    return cubicToGrid(neighborCubic);
  }
  return neighborCubic;
};

export const getAllNeighbors = (coords, returningGrid = true) => {
  return Object.keys(neighborPositions).map(neighborPosition => getNeighbor(coords, neighborPosition, returningGrid));
};
