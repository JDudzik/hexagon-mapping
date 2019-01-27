const axialY = (x, y) => y - (Math.floor(x / 2));
const axialYToGrid = (x, y) => y + Math.floor(x / 2);
const calculateCubicZ = (x, y) => (x / -1) - y;

export const gridToAxial = (x, y) => ({ x: x, y: axialY(x, y)});
export const gridToCubic = (x, y) => {
  const axialCoords = gridToAxial(x, y);
  return axialToCubic(axialCoords.x, axialCoords.y);
};
export const axialToGrid = (x, y) => ({ x: x , y: axialYToGrid(x, y) });
export const axialToCubic = (x, y) => ({ x: x, y: y, z: calculateCubicZ(x, y)});






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
      const gridCoords = axialToGrid(axialCoords.x, axialCoords.y);
      hexData.topper = `
        [${gridCoords.x},  ${gridCoords.y}] - - - - -
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
