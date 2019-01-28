import { gridToCubic, gridToAxial, axialToGrid } from './conversions';


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

export const neighborsT = (coords, usingGridCoords = false) => {
  let cubicCoords = coords;
  if (usingGridCoords) { cubicCoords = gridToCubic(coords); }
  return {
    x: cubicCoords.x,
    y: cubicCoords.y - 1,
    z: cubicCoords.z + 1,
  };
};
