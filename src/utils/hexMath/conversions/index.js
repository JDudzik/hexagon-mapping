const axialY = (gridCoords) => gridCoords.y - (Math.floor(gridCoords.x / 2));
const axialYToGrid = (axialCoords) => axialCoords.y + Math.floor(axialCoords.x / 2);
const calculateCubicZ = (axialCoords) => (axialCoords.x / -1) - axialCoords.y;

export const gridToAxial = (gridCoords) => ({ x: gridCoords.x, y: axialY(gridCoords)});
export const gridToCubic = (gridCoords) => axialToCubic( gridToAxial(gridCoords) );
export const axialToGrid = (axialCoords) => ({ x: axialCoords.x , y: axialYToGrid(axialCoords) });
export const axialToCubic = (axialCoords) => ({
  x: axialCoords.x,
  y: axialCoords.y,
  z: calculateCubicZ(axialCoords),
});
export const cubicToGrid = (cubicCoords) => axialToGrid(cubicCoords); // This method only exists as a mental helper. In actuallity, you can simply call "axialToGrid" even for cubic coords.

export const isGridCoords = coords => !coords.z && coords.z !== 0;
export const isCubicCoords = coords => !!coords.z || coords.z === 0;

export const setToGrid = coords => {
  if (isGridCoords(coords)) {
    return coords;
  }
  return cubicToGrid(coords);
};
export const setToCubic = coords => {
  if (isCubicCoords(coords)) {
    return coords;
  }
  return gridToCubic(coords);
};
export const getReturnableCoords = (coords, returnGrid) => {
  if (returnGrid) {
    return setToGrid(coords);
  } else {
    return setToCubic(coords);
  }
};
