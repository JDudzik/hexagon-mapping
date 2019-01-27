const axialX = (x, y) => y - (Math.floor(x / 2));
const axialXToGrid = (axialX, axialY) => axialX + Math.floor(axialY / 2);
const calculateCubicZ = (axialX, axialY) => (axialX / -1) - axialY;

export const gridToAxial = (x, y) => ({ x: x, y: axialX(x, y)});
export const gridToCubic = (x, y) => {
  const axialCoords = gridToAxial(x, y);
  return axialToCubic(axialCoords.x, axialCoords.y);
};
export const axialToGrid = (axialX, axialY) => ({ x: axialXToGrid(axialX, axialY), y: axialY });
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

export const swapFullToppersToAxial = (gridData, updateHexes) => {
  const newHexes = [];

  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      const axialCoords = gridToAxial(xIndex, yIndex);
      hexData.topper = `
        [${xIndex},        ${yIndex}] . . . . .
        [${axialCoords.x}, ${axialCoords.y}]
      `;
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
