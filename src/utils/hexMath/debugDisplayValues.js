import { gridToCubic, gridToAxial, axialToGrid, cubicToGrid } from './conversions';
import { getCubicFromCubicAnchor, getNeighbor, getAllNeighbors } from './interactions';
import { getGridHexes } from './grid';

export const swapFullToppersToCubic = (gridData, updateHexes) => {
  const newHexes = [];
  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      const cubicCoords = gridToCubic({x: xIndex, y: yIndex});
      hexData.topper = `${cubicCoords.x}, ${cubicCoords.y}, ${cubicCoords.z}`;
      newHexes.push({
        gridCoords: {x: xIndex, y: yIndex},
        hexData: hexData,
      });
    });
  });
  updateHexes(newHexes);
};

export const swapFullToppersWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const anchorCubicCoords = gridToCubic(anchorGridCoords);
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicFromCubicAnchor(anchorCubicCoords, gridCoords);
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
