const axialX = (x, y) => x - Math.floor(y / 2);
const axialXToGrid = (axialX, axialY) => axialX + Math.floor(axialY / 2);
const calculateCubicZ = (axialX, axialY) => (axialX / -1) - axialY;

export const gridToAxial = (x, y) => ({ y: y, x: axialX(x, y) });
export const gridToCubic = (x, y) => {
  const axialCoords = gridToAxial(x, y);
  return axialToCubic(axialCoords.x, axialCoords.y);
};
export const axialToGrid = (axialX, axialY) => ({ y: axialY, x: axialXToGrid(axialX, axialY) });
export const axialToCubic = (axialX, axialY) => ({ x: axialX, y: axialY, z: calculateCubicZ(axialX, axialY)});


export const swapFullToppersToCubic = (gridData, updateHexes) => {
  const newHexes = [];

  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      const cubicCoords = gridToCubic(xIndex, yIndex);
      hexData.topper = `${cubicCoords.x}, ${cubicCoords.y}, ${cubicCoords.z}`;
      newHexes.push({
        x: xIndex,
        y: yIndex,
        hexData: hexData,
      });
    });
  });

  updateHexes(newHexes);
};


export const setBasicGridToppers = (gridData, updateHexes) => {
  const newHexes = [];

  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      hexData.topper = `${xIndex}, ${yIndex}`;
      newHexes.push({
        x: xIndex,
        y: yIndex,
        hexData: hexData,
      });
    });
  });

  updateHexes(newHexes);
};
